"use client";
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

const Interview = ({params}) => {
    const [interviewData, setInterviewData] = useState();
    const [webcamEnabled, setWebcamEnabled] = useState(false);
    useEffect(()=>{
        GetInterviewDetails();
    },[]);
  
    const GetInterviewDetails = async() =>{
    const result = await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);
    setInterviewData(result[0]);
  }
  
    return (
    <div className="my-10">
        <h2 className="flex flex-col items-center font-bold text-2xl">Let's Get Started 🎯</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="flex flex-col my-5 gap-5">
            <div className="flex flex-col p-5 rounded-lg border gap-5">
                <h2 className="text-lg"><strong>Job Role/Job Position: </strong>{interviewData?.jobPosition}</h2>
                <h2 className="text-lg">
                    <strong>Job Description/Tech Stack: </strong>{interviewData?.jobDesc}
                </h2>
                <h2 className="text-lg">
                    <strong>Years of Experience: </strong>{interviewData?.jobExperience}
                </h2>
            </div>
            <div className = "p-5 border rounded-lg border-yellow-600 bg-yellow-100">
                <h2 className="flex gap-2 items-centre text-yellow-600">
                    <Lightbulb></Lightbulb><strong>Information</strong>
                </h2>
                <h2 className="mt-3 text-yellow-600 pl-2">
                    Enable Video Web Cam and Microphone to Start your Al Generated Mock Interview, It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. <br/>NOTE: We never record your video , Web cam access you can disable at any time if you want</h2>
            </div>
            </div>
            <div>
                {webcamEnabled?  <Webcam
                    onUserMedia={()=> setWebcamEnabled(true)}
                    onUserMediaError={()=>setWebcamEnabled(false)}
                    mirrored = {true}
                    style = {{
                        height:400,
                        width:500,
                        margin: "0.8rem 0"
                    }}
                ></Webcam>
                :<>
                    <WebcamIcon 
                    className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border px-10"></WebcamIcon>
                    <Button className="w-full border border-black" variant='ghost' onClick = {()=>setWebcamEnabled(true)}>Enable WebCam and MicroPhone</Button>
                </> 
                }
            </div>

        </div>
        <div className="flex justify-end items-end">
            <Link href = {'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button>Click to Start</Button>
            </Link>
        </div>
    </div>
  )
}

export default Interview