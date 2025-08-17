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
    
    const onSubmit = async(e) => {
        setLoadings(true);
        e.preventDefault();

        const Inputprompt = "Job Position: "+ jobPosition + ", Job description: "  + jobDesc + ", Years of experience: "+ jobExperience +", Depending on this information, generate 5 interview questions with answers in JSON formate. Give Question and Answered as fields in JSON. Do not add any unnecessary explanation in the response. just the json response";

        const result = await chatSession.sendMessage(Inputprompt);
        let mockjsonresponse = (result.response.text()).replace('```json', '').replace('```', '');
        mockjsonresponse.slice(0,-4)
        setJsonResponse(mockjsonresponse);

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

            if(resp ){
                setOpenDialog(false);
                if(path != "/dashboard/interview/"+resp[0]?.mockId){
                    router.push("/dashboard/interview/"+resp[0]?.mockId);
                }
            }
        }else{
            console.error("No response from Gemini AI");
        }

        setLoadings(false);
    };
    return (
    <div>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gradient-to-br from-fuchsia-50 to-purple-50
        hover:scale-105 hover:shadow-lg hover:border-fuchsia-300 cursor-pointer transition-all duration-300 group"
        onClick={()=>setOpenDialog(true)}>
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-fuchsia-100 rounded-full mb-4 group-hover:bg-fuchsia-200 transition-colors">
                    <svg className="w-8 h-8 text-fuchsia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <h2 className="font-bold text-lg text-gray-700 group-hover:text-fuchsia-600 transition-colors">Create New Interview</h2>
                <p className="text-sm text-gray-500 mt-2">Start your AI-powered mock interview</p>
            </div>
        </div>
        <Dialog open={OpenDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-3">
            <DialogTitle className="text-2xl font-bold text-gray-800">
                Tell us about your interview 🎯</DialogTitle>
            <DialogDescription className="text-gray-600">
                Provide details about the job position to generate personalized interview questions.
            </DialogDescription>
            </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-6 mt-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Job Role/Position *</label>
                        <Input 
                            placeholder="e.g., Frontend Engineer, Product Manager" 
                            required
                            className="h-11"
                            onChange={(e)=>setJobPosition(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Job Description & Tech Stack *</label>
                        <Textarea 
                            placeholder="e.g., React.js, Node.js, TypeScript, API development, agile methodologies..."
                            required
                            className="min-h-[100px] resize-none"
                            onChange={(e)=>setJobDesc(e.target.value)}
                        />
                        <p className="text-xs text-gray-500">Briefly describe the key technologies and responsibilities</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Years of Experience *</label>
                        <Input 
                            placeholder="e.g., 3" 
                            type="number" 
                            required 
                            max="50"
                            min="0"
                            className="h-11"
                            onChange={(e)=>setJobExperience(e.target.value)}
                        />
                        <p className="text-xs text-gray-500">Total years of relevant professional experience</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-end pt-4 border-t">
                    <Button 
                        variant="outline" 
                        type="button" 
                        className="px-6"
                        onClick={()=>setOpenDialog(false)}
                        disabled={loadings}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={loadings}
                        className="px-6 bg-fuchsia-600 hover:bg-fuchsia-700"
                    >
                        {loadings ? (
                            <div className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin h-4 w-4"/>
                                <span>Generating Questions...</span>
                            </div>
                        ) : (
                            "Start Interview"
                        )}
                    </Button>
                </div>
                </form>
        </DialogContent>
        </Dialog>
    </div>
  )
}
