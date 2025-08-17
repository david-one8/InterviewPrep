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
    <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Let&apos;s Get Started 🎯</h1>
                <p className="text-gray-600">Review your interview details and enable your camera to begin</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Interview Details */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <Briefcase className="h-5 w-5 mr-2 text-fuchsia-600" />
                            Interview Details
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="w-2 h-2 bg-fuchsia-500 rounded-full mt-2 mr-3"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Job Position</p>
                                    <p className="text-lg font-semibold text-gray-900">{interviewData?.jobPosition}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-2 h-2 bg-fuchsia-500 rounded-full mt-2 mr-3"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Tech Stack & Description</p>
                                    <p className="text-gray-700">{interviewData?.jobDesc}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-2 h-2 bg-fuchsia-500 rounded-full mt-2 mr-3"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Experience Level</p>
                                    <p className="text-lg font-semibold text-gray-900">{interviewData?.jobExperience} years</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Information Card */}
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <Lightbulb className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-yellow-800 mb-2">Interview Instructions</h3>
                                <div className="text-yellow-700 space-y-2">
                                    <p>• Enable your webcam and microphone for the best experience</p>
                                    <p>• You&apos;ll be asked 5 AI-generated questions based on your profile</p>
                                    <p>• Speak clearly and take your time to answer each question</p>
                                    <p>• Get detailed feedback and suggestions after completion</p>
                                </div>
                                <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                                    <p className="text-sm text-yellow-800">
                                        <strong>Privacy:</strong> We never record or store your video. Camera access can be disabled anytime.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Camera Setup */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <WebcamIcon className="h-5 w-5 mr-2 text-fuchsia-600" />
                            Camera Setup
                        </h2>
                        
                        <div className="relative">
                            {webcamEnabled ? (
                                <div className="relative rounded-xl overflow-hidden bg-gray-900">
                                    <Webcam
                                        onUserMedia={() => setWebcamEnabled(true)}
                                        onUserMediaError={() => setWebcamEnabled(false)}
                                        mirrored={true}
                                        className="w-full h-80 object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                            <span>Camera Active</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <div className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                                        <WebcamIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Camera Disabled</h3>
                                        <p className="text-gray-500 mb-4">Enable your camera to start the interview</p>
                                        <Button 
                                            onClick={() => setWebcamEnabled(true)}
                                            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-6 py-2"
                                        >
                                            <WebcamIcon className="h-4 w-4 mr-2" />
                                            Enable Camera & Microphone
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Start Interview Button */}
            <div className="mt-8 text-center">
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                    <Button 
                        size="lg"
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-8 py-3 text-lg font-medium"
                        disabled={!webcamEnabled}
                    >
                        {webcamEnabled ? (
                            <>
                                <Play className="h-5 w-5 mr-2" />
                                Start Interview
                            </>
                        ) : (
                            <>
                                <WebcamIcon className="h-5 w-5 mr-2" />
                                Enable Camera First
                            </>
                        )}
                    </Button>
                </Link>
                {!webcamEnabled && (
                    <p className="text-sm text-gray-500 mt-2">Please enable your camera to proceed with the interview</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Interview