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
import { usePathname } from 'next/navigation';


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
        e.preventDefault();
        setLoadings(true);
        console.log(jobDesc, jobPosition, jobExperience);


        const Inputprompt = "Job Position: "+ jobPosition + ", Job description: "  + jobDesc + ", Years of experience: "+ jobExperience +", Depending on this information, generate 5 interview questions with answers in JSON formate. Give Question and Answered as fields in JSON. Do not add any unnecessary explanation in the response. just the json response";


        const result = await chatSession.sendMessage(Inputprompt);
        let mockjsonresponse = await result.response.text();

        // Remove all markdown code block markers and stray 'json' text globally, then trim
        mockjsonresponse = mockjsonresponse
                 .split('```json').join('')
                 .split('```').join('')
                 .replace(/json/gi, '')
                 .trim();


        // Extract JSON substring to last closing brace or bracket
        const lastBrace = mockjsonresponse.lastIndexOf('}');
        const lastBracket = mockjsonresponse.lastIndexOf(']');
        const truncateAt = Math.max(lastBrace, lastBracket);
        if(truncateAt !== -1) {
            mockjsonresponse = mockjsonresponse.substring(0, truncateAt + 1);
        }


        setJsonResponse(mockjsonresponse);


        try {
            const parsedResponse = JSON.parse(mockjsonresponse);
            console.log(parsedResponse);
            if(parsedResponse){
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


                console.log("Inserted id", resp);
                if(resp ){
                    setOpenDialog(false);
                    if(path != "/dashboard/interview/"+resp[0]?.mockId){
                        router.push("/dashboard/interview/"+resp[0]?.mockId);
                    }
                }
            }
        } catch (error) {
            console.error("JSON parsing error:", error, mockjsonresponse);
        }


        setLoadings(false);
    };


    return (
    <div>
        <div className="p-6 sm:p-8 lg:p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer transition-all touch-manipulation"
        onClick={()=>setOpenDialog(true)}>
            <h2 className="font-bold text-base sm:text-lg text-center">+ Add New</h2>
        </div>
        <Dialog open={OpenDialog}>
        <DialogContent className="max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader>
            <DialogTitle className="text-lg sm:text-2xl">
                Tell us more about the job you are interviewing</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                    <h2 className="text-sm sm:text-base mb-4 text-muted-foreground">
                        Add details about your job position/role, job description,
                        your skills and years of experience 
                    </h2>
                    <div className="my-3 p-1">
                        <label className="block text-sm font-medium mb-1 text-foreground">Job Role/Job Position</label>
                        <Input placeholder="Eg. FrontEnd Engineer" required
                        onChange={(e)=>setJobPosition(e.target.value)}
                        className="w-full"></Input>
                    </div>
                    <div className="my-3 p-1">
                        <label className="block text-sm font-medium mb-1 text-foreground">Job Description and Tech Stack (in short)</label>
                        <Textarea 
                        placeholder="Eg. Reactjs, Nodejs, Nextjs, UI design" required
                        onChange={(e)=>setJobDesc(e.target.value)}
                        className="w-full min-h-[80px] resize-none"></Textarea>
                    </div>
                    <div className="my-3 p-1">
                        <label className="block text-sm font-medium mb-1 text-foreground">Years of Experience</label>
                        <Input placeholder="Eg. 5" type="number" required max="50"
                        onChange={(e)=>setJobExperience(e.target.value)}
                        className="w-full"></Input>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end mt-6">
                    <Button variant = "ghost" type="button" className="border-2 border-foreground text-foreground w-full sm:w-auto order-2 sm:order-1"
                    onClick={()=>setOpenDialog(false)}>Cancel</Button>
                    <Button type="submit" disabled={loadings} className="w-full sm:w-auto order-1 sm:order-2">
                    {loadings ?
                        <>
                        <LoaderCircle className = "animate-spin mr-2"/>
                        <span className="hidden sm:inline">AI is generating questions</span>
                        <span className="sm:hidden">Generating...</span>
                        </>
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
