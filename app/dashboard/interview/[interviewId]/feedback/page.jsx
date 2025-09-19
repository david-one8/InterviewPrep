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
function Feedback({params}) {
    const [feedbackList, setFeedbackList] = useState(); 
    const [avgFeedback, setAvgFeedback] = useState();
    const router = useRouter();
    
    useEffect(()=>{
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
        
        GetFeedback();
    },[params.interviewId]);
    
  return (
    <div className='p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto'>
        <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-500 mb-2">
                Congratulations! 🎉
            </h2>
            <h2 className="font-bold text-lg sm:text-2xl mb-3 sm:mb-4 text-gray-800">
                Below is feedback of your performance
            </h2>
            <div className="inline-flex items-center px-4 py-2 bg-fuchsia-50 border border-fuchsia-200 rounded-lg">
                <h2 className="text-fuchsia-600 text-base sm:text-xl font-semibold">
                    Your overall interview rating: <strong className="text-fuchsia-700">{avgFeedback}/10</strong>
                </h2>
            </div>
        </div>
        
        <div className="mb-6">
            <h2 className="text-base sm:text-lg text-gray-700 mb-4">
                Find below all the interview questions with correct answers, 
                your answers, and feedback for improvement:
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
                {feedbackList && feedbackList.map((item, index) =>(
                    <Collapsible key = {index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <CollapsibleTrigger className = "p-3 sm:p-4 bg-yellow-50 hover:bg-yellow-100 text-left flex justify-between items-center gap-3 w-full transition-colors">
                        <span className="text-sm sm:text-base font-medium text-gray-800 flex-1 min-w-0">
                            <span className="hidden sm:inline">Q{index + 1}: </span>{item.question}
                        </span>
                        <ChevronsUpDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-t border-gray-200">
                        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                            <div className="flex items-center justify-center">
                                <div className="inline-flex items-center px-3 py-1 bg-yellow-100 border border-yellow-300 rounded-full">
                                    <span className="text-yellow-700 font-semibold text-sm">
                                        Rating: {item.rating[0]}/10
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-3 sm:p-4 rounded-lg bg-red-50 border border-red-200">
                                <h3 className="font-semibold text-red-800 mb-2 text-sm sm:text-base">Your Answer:</h3>
                                <p className="text-xs sm:text-sm text-red-700 leading-relaxed">{item.userAns}</p>
                            </div>
                            
                            <div className="p-3 sm:p-4 rounded-lg bg-green-50 border border-green-200">
                                <h3 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">Sample Correct Answer:</h3>
                                <p className="text-xs sm:text-sm text-green-700 leading-relaxed">{item.correctAns}</p>
                            </div>
                            
                            <div className="p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-200">
                                <h3 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Feedback:</h3>
                                <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">{item.feedback}</p>
                            </div>
                        </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
            </div>
        </div>
        
        <div className="text-center mt-8 sm:mt-10">
            <Button 
                className="w-full sm:w-auto px-6 py-3 text-base font-medium bg-fuchsia-600 hover:bg-fuchsia-700"
                onClick = {()=>router.replace('/dashboard')}
            > 
                Go Home
            </Button>
        </div>
    </div>
  )
}

export default Feedback