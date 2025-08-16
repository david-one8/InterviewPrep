"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
function feedback({params}) {
    const [feedbackList, setFeedbackList] = useState(); 
    const [avgFeedback, setAvgFeedback] = useState();
    const router = useRouter();
    useEffect(()=>{
        GetFeedback();
    },[]);
    const GetFeedback = async () => {
        const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);
        setFeedbackList(result);
        console.log(result);

        if(result?.length == 0){
            setAvgFeedback(0);
        }else{
            let sum = 0;
            for(let i = 0; i < result?.length; i++){
                let rating = result[i].rating;
                rating = rating[0];
                sum += Number(rating);
            }
            let avg = sum / result?.length;
            avg = Math.round(avg);
            setAvgFeedback(avg);
        }
    }
  return (
    <div className='p-10'>
        <h2 className="text-3xl font-bold text-emerald-500">
            Congratulations !</h2>
        <h2 className="font-bold text-2xl mt-4">
            Below is feedback of your performance</h2>
        <h2 className="text-fuchsia-500 text-xl my-3">
            Your overall interview rating: <strong>{avgFeedback}/10</strong>
        </h2>
        <h2 className="text-lg">
            Find below all the interview questions with correct answers, 
            your answers, and feedback for improvement
            {feedbackList && feedbackList.map((item, index) =>(
                <Collapsible key = {index}>
                <CollapsibleTrigger className = "p-2 bg-yellow-100 rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                {item.question} <ChevronsUpDown></ChevronsUpDown>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-yellow-500 p-2 border rounded-lg">
                            Rating: <strong>{item.rating[0]}/10</strong></h2>
                        <h2 className="p-2 rounded-lg bg-red-50 text-sm text-red-950">
                            <strong>Your Answer: </strong>{item.userAns}
                        </h2>
                        <h2 className="p-2 rounded-lg bg-green-50 text-sm text-green-950">
                            <strong>Sample Correct Answer: </strong>{item.correctAns}
                        </h2>
                        <h2 className="p-2 rounded-lg bg-blue-50 text-sm text-blue-950">
                            <strong>Feedback: </strong>{item.feedback}
                        </h2>
                    </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
            </h2>
        <Button className="my-10"
        onClick = {()=>router.replace('/dashboard')}> Go Home</Button>
    </div>
  )
}

export default feedback