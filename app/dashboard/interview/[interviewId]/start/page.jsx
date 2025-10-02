"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StartInterview = ({params}) => {

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestions, setMockInterviewQuestions] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    useEffect(()=>{
        const GetInterviewDetails = async() =>{
            const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

            setInterviewData(result[0]);
            const jsonMockResp = JSON.parse(result[0]?.jsonMockResp);
            setMockInterviewQuestions(jsonMockResp); 
        }
        GetInterviewDetails();
    },[params.interviewId]);
    return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <QuestionSection 
                mockInterviewQuestions = {mockInterviewQuestions}
                activeQuestionIndex = {activeQuestionIndex}></QuestionSection>

                <RecordAnswerSection
                mockInterviewQuestions = {mockInterviewQuestions}
                activeQuestionIndex = {activeQuestionIndex}
                interviewData = {interviewData}>
                </RecordAnswerSection>
            </div>
            
            {/* Navigation Controls */}
            <div className="mt-6 sm:mt-8 sticky bottom-4 sm:bottom-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-5">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 order-2 sm:order-1">
                        Progress: {activeQuestionIndex + 1} of {mockInterviewQuestions?.length || 0} questions
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto order-1 sm:order-2">
                        {activeQuestionIndex > 0 && 
                        <Button 
                            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                            variant="outline"
                            className="w-full sm:w-auto min-h-[44px] touch-manipulation"
                        >
                            Previous Question
                        </Button>}
                        
                        {activeQuestionIndex != mockInterviewQuestions?.length - 1 && 
                        <Button 
                            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                            className="w-full sm:w-auto min-h-[44px] touch-manipulation"
                        >
                            Next Question
                        </Button>}
                        
                        {activeQuestionIndex == mockInterviewQuestions?.length - 1 && 
                        <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
                            <Button className="w-full sm:w-auto min-h-[44px] touch-manipulation bg-green-600 hover:bg-green-700">
                                End Interview
                            </Button>
                        </Link>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StartInterview;
