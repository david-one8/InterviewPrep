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
        GetInterviewDetails();
    },[]);
  
    const GetInterviewDetails = async() =>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

        setInterviewData(result[0]);
        const jsonMockResp = JSON.parse(result[0]?.jsonMockResp);
        setMockInterviewQuestions(jsonMockResp); 
        console.log(jsonMockResp);

    }
    return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <QuestionSection 
            mockInterviewQuestions = {mockInterviewQuestions}
            activeQuestionIndex = {activeQuestionIndex}></QuestionSection>

            <RecordAnswerSection
            mockInterviewQuestions = {mockInterviewQuestions}
            activeQuestionIndex = {activeQuestionIndex}
            interviewData = {interviewData}>
            </RecordAnswerSection>
        </div>
        <div className="flex justify-end gap-5">
             {activeQuestionIndex > 0 && 
             <Button onClick = {()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
            {activeQuestionIndex != mockInterviewQuestions?.length-1 && 
            <Button onClick = {()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
            {activeQuestionIndex == mockInterviewQuestions?.length-1 && 
            <Link href = {'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
            <Button>End Interview </Button>
            </Link>}
        </div>
    </div>
  )
}

export default StartInterview;
