"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon, Briefcase, Play } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const Interview = ({params}) => {
    const [interviewData, setInterviewData] = useState();
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    
    useEffect(()=>{
        const GetInterviewDetails = async() =>{
            const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

            console.log(result);
            setInterviewData(result[0]);
        }
        
        GetInterviewDetails();
    },[params.interviewId]);
  
    return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Let&apos;s Get Started 🎯</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Review your interview details and enable your camera to begin</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Interview Details */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                            <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-fuchsia-600 dark:text-fuchsia-400" />
                            Interview Details
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-start">
                                <div className="w-2 h-2 bg-fuchsia-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Job Position</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 break-words">{interviewData?.jobPosition}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-2 h-2 bg-fuchsia-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Tech Stack & Description</p>
                                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 break-words">{interviewData?.jobDesc}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-2 h-2 bg-fuchsia-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Experience Level</p>
                                    <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">{interviewData?.jobExperience} years</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Information Card */}
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 sm:p-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-base sm:text-lg font-medium text-yellow-800 dark:text-yellow-300 mb-2">Interview Instructions</h3>
                                <div className="text-yellow-700 dark:text-yellow-400 space-y-1 sm:space-y-2 text-sm sm:text-base">
                                    <p>• Enable your webcam and microphone for the best experience</p>
                                    <p>• You&apos;ll be asked 5 AI-generated questions based on your profile</p>
                                    <p>• Speak clearly and take your time to answer each question</p>
                                    <p>• Get detailed feedback and suggestions after completion</p>
                                </div>
                                <div className="mt-3 sm:mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                    <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-300">
                                        <strong>Privacy:</strong> We never record or store your video. Camera access can be disabled anytime.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Camera Setup */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                            <WebcamIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-fuchsia-600 dark:text-fuchsia-400" />
                            Camera Setup
                        </h2>
                        
                        <div className="relative">
                            {webcamEnabled ? (
                                <div className="relative rounded-xl overflow-hidden bg-gray-900">
                                    <Webcam
                                        onUserMedia={() => setWebcamEnabled(true)}
                                        onUserMediaError={() => setWebcamEnabled(false)}
                                        mirrored={true}
                                        className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                                    />
                                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                                        <div className="flex items-center space-x-1 sm:space-x-2 bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                                            <span className="hidden sm:inline">Camera Active</span>
                                            <span className="sm:hidden">Active</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 sm:p-12 text-center">
                                        <WebcamIcon className="h-16 w-16 sm:h-24 sm:w-24 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Camera Disabled</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm sm:text-base">Enable your camera to start the interview</p>
                                        <Button 
                                            onClick={() => setWebcamEnabled(true)}
                                            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base w-full sm:w-auto"
                                        >
                                            <WebcamIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                            <span className="hidden sm:inline">Enable Camera & Microphone</span>
                                            <span className="sm:hidden">Enable Camera</span>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Start Interview Button */}
            <div className="mt-6 sm:mt-8 text-center">
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                    <Button 
                        size="lg"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-lg font-medium w-full sm:w-auto"
                        disabled={!webcamEnabled}
                    >
                        {webcamEnabled ? (
                            <>
                                <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                Start Interview
                            </>
                        ) : (
                            <>
                                <WebcamIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                Enable Camera First
                            </>
                        )}
                    </Button>
                </Link>
                {!webcamEnabled && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">Please enable your camera to proceed with the interview</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Interview