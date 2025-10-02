"use client";
import Webcam from "react-webcam";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Square, Loader, Video } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModel";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserAnswer } from "@/utils/schema";

const RecordAnswerSection = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) => {
  const { user } = useUser();
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState(null);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      const UpdateUserAnswer = async () => {
        setLoading(true);

        const feedbackPrompt =
          "Question:" +
          mockInterviewQuestions[activeQuestionIndex]?.Question +
          ", User Answer: " +
          userAnswer +
          " Keeping in mind the given question and answer for a interview, give us rating for the answer and feedback as area of improvement, if any in just 3-5 lines to improve it. Also the rating should be a number out of 10. If the rating you feel is 5 out of 10, send the response in the format 5/10. Give the response in JSON format with rating field and feedback field.";

        const result = await chatSession.sendMessage(feedbackPrompt);

        let mockJsonResponse = await result.response.text();

        // Clean possible code block wrappers
        mockJsonResponse = mockJsonResponse
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        let JsonFeedbackResp;
        try {
          JsonFeedbackResp = JSON.parse(mockJsonResponse);
        } catch (err) {
          console.error("Invalid JSON from LLM:", mockJsonResponse);

          // Try auto-fixing common JSON mistakes
          mockJsonResponse = mockJsonResponse
            .replace(/,\s*}/g, "}")
            .replace(/,\s*]/g, "]");

          try {
            JsonFeedbackResp = JSON.parse(mockJsonResponse);
          } catch (err2) {
            toast.error("Could not parse AI feedback");
            setLoading(false);
            return;
          }
        }

        const resp = await db.insert(UserAnswer).values({
          question: mockInterviewQuestions[activeQuestionIndex]?.Question,
          mockIdRef: interviewData?.mockId,
          correctAns: mockInterviewQuestions[activeQuestionIndex]?.Answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        });

        if (resp) {
          toast.success("Answer saved successfully");
          setUserAnswer("");
          setResults([]);
        }
        setResults([]);
        setLoading(false);
      };
      UpdateUserAnswer();
    }
  }, [
    isRecording,
    userAnswer,
    mockInterviewQuestions,
    activeQuestionIndex,
    interviewData,
    user,
    setResults,
  ]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      setRecordingInterval(interval);
    } else {
      if (recordingInterval) {
        clearInterval(recordingInterval);
        setRecordingInterval(null);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [isRecording, recordingInterval]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      setUserAnswer("");
      startSpeechToText();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          <Video className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-fuchsia-600 dark:text-fuchsia-400 flex-shrink-0" />
          Record Your Answer
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
          Speak clearly and take your time. Your response will be automatically
          transcribed.
        </p>
      </div>

      {/* Webcam Area */}
      <div className="relative mb-4 sm:mb-6">
        <div className="relative bg-gray-900 rounded-xl overflow-hidden">
          <Webcam 
            mirrored={true} 
            className="w-full h-48 sm:h-64 lg:h-72 object-cover" 
            style={{ maxHeight: 'min(72vh, 300px)' }}
          />

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
              <div className="flex items-center space-x-1 sm:space-x-2 bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                <span className="font-medium">REC {formatTime(recordingTime)}</span>
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <div className="flex items-center space-x-1 sm:space-x-2 bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
              <span className="font-medium hidden sm:inline">Camera Active</span>
              <span className="font-medium sm:hidden">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transcription Area */}
      {(userAnswer || isRecording) && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Live Transcription:
          </h3>
          <div className="text-gray-900 dark:text-gray-100 min-h-[48px] sm:min-h-[60px] max-h-32 sm:max-h-40 overflow-y-auto text-sm sm:text-base">
            {userAnswer}
            {isRecording && interimResult && (
              <span className="text-gray-500 dark:text-gray-400 italic"> {interimResult}</span>
            )}
            {isRecording && !interimResult && !userAnswer && (
              <span className="text-gray-400 dark:text-gray-500 italic">Listening...</span>
            )}
          </div>
        </div>
      )}

      {/* Recording Controls */}
      <div className="text-center">
        <Button
          onClick={StartStopRecording}
          disabled={loading}
          size="lg"
          className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 text-base sm:text-lg font-medium transition-all duration-200 min-h-[48px] touch-manipulation ${
            isRecording
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          }`}
        >
          {isRecording ? (
            <>
              <Square className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Record Answer
            </>
          )}
        </Button>

        {loading && (
          <div className="mt-3 sm:mt-4 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400">
            <Loader className="animate-spin h-4 w-4 mr-2" />
            <span className="text-xs sm:text-sm">Processing your answer...</span>
          </div>
        )}

        {error && (
          <div className="mt-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 text-center">
              <strong>Microphone error:</strong> {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordAnswerSection;
