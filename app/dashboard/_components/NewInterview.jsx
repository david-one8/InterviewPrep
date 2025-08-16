"use client";
import React, {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4} from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
export const NewInterview = () => {
    const [OpenDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loadings, setLoadings] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);

    const {user} = useUser();
    const router = useRouter();
    const path = usePathname();
    console.log(path);
    const onSubmit = async(e) => {
        setLoadings(true);
        e.preventDefault();
        console.log(jobDesc, jobPosition, jobExperience);

        const Inputprompt = "Job Position: "+ jobPosition + ", Job description: "  + jobDesc + ", Years of experience: "+ jobExperience +", Depending on this information, generate 5 interview questions with answers in JSON formate. Give Question and Answered as fields in JSON. Do not add any unnecessary explanation in the response. just the json response";

        const result = await chatSession.sendMessage(Inputprompt);
        let mockjsonresponse = (result.response.text()).replace('```json', '').replace('```', '');
        mockjsonresponse.slice(0,-4)
        //console.log(mockjsonresponse);
        setJsonResponse(mockjsonresponse);
        console.log(JSON.parse(mockjsonresponse));

        //stroing in db
        if(mockjsonresponse){
            const resp = await db.insert(MockInterview)
            .values({
                mockId:uuidv4(),
                jsonMockResp: mockjsonresponse,
                jobPosition: jobPosition,
                jobDesc: jobDesc,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy'),
            }).returning({mockId: MockInterview.mockId});

            console.log("Intered id", resp);
            if(resp ){
                setOpenDialog(false);
                if(path != "/dashboard/interview/"+resp[0]?.mockId){
                    router.push("/dashboard/interview/"+resp[0]?.mockId);
                }
            }
        }else{
            console.log("No response from Gemini AI");
        }

        setLoadings(false);
    };
    return (
    <div>
        <div className="p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={()=>setOpenDialog(true)}>
            <h2 className="font-bold text-lg text-center">+ Add New</h2>
        </div>
        <Dialog open={OpenDialog}>
        <DialogContent className="max-w-2xl">
            <DialogHeader>
            <DialogTitle className="text-2xl">
                Tell us more about the job you are interviewing</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                    <h2>
                        Add details about your job position/role, job description,
                        your skills and years of experience 
                    </h2>
                    <div className="my-3 p-1">
                        <label>Job Role/Job Position</label>
                        <Input placeholder="Eg. FrontEnd Engineer" required
                        onChange={(e)=>setJobPosition(e.target.value)}></Input>
                    </div>
                    <div className="my-1 p-1">
                        <label>Job Description and Tech Stack (in short)</label>
                        <Textarea 
                        placeholder="Eg. Reactjs, Nodejs, Nextjs, UI design" required
                        onChange={(e)=>setJobDesc(e.target.value)}></Textarea>
                    </div>
                    <div className="my-1 p-1">
                        <label>Years of Experience</label>
                        <Input placeholder="Eg. 5" type="number" required max="50"
                        onChange={(e)=>setJobExperience(e.target.value)}></Input>
                    </div>
                </div>
                <div className="flex gap-5 justify-end">
                    <Button variant = "ghost" type="button" className="border-2 border-black text-black"
                    onClick={()=>setOpenDialog(false)}>Cancel</Button>
                    <Button type="submit" disabled={loadings}>
                    {loadings ?
                        <>
                        <LoaderCircle className = "animate-spin"/>AI is generating questions</>
                        :"Start Interview"
                    }</Button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    </div>
  )
}
