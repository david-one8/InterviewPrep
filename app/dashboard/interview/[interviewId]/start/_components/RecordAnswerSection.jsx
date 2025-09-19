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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Video className="h-5 w-5 mr-2 text-fuchsia-600" />
          Record Your Answer
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Speak clearly and take your time. Your response will be automatically
          transcribed.
        </p>
      </div>

      {/* Webcam Area */}
      <div className="relative mb-6">
        <div className="relative bg-gray-900 rounded-xl overflow-hidden">
          <Webcam mirrored={true} className="w-full h-64 object-cover" />

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>REC {formatTime(recordingTime)}</span>
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Camera Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transcription Area */}
      {(userAnswer || isRecording) && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Live Transcription:
          </h3>
          <p className="text-gray-900 min-h-[60px]">
            {userAnswer}
            {isRecording && interimResult && (
              <span className="text-gray-500 italic"> {interimResult}</span>
            )}
            {isRecording && !interimResult && !userAnswer && (
              <span className="text-gray-400 italic">Listening...</span>
            )}
          </p>
        </div>
      )}

      {/* Recording Controls */}
      <div className="text-center">
        <Button
          onClick={StartStopRecording}
          disabled={loading}
          size="lg"
          className={`px-8 py-3 text-lg font-medium transition-all duration-200 ${
            isRecording
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
          }`}
        >
          {isRecording ? (
            <>
              <Square className="h-5 w-5 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="h-5 w-5 mr-2" />
              Record Answer
            </>
          )}
        </Button>

        {loading && (
          <div className="mt-4 flex items-center justify-center text-fuchsia-600">
            <Loader className="animate-spin h-4 w-4 mr-2" />
            <span className="text-sm">Processing your answer...</span>
          </div>
        )}

        {error && (
          <p className="mt-2 text-sm text-red-600">
            Microphone error: {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecordAnswerSection;
