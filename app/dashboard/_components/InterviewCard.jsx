import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewCard({interview}) {
    const router = useRouter();

    const onStart = ()=>{
        router.push("dashboard/interview/"+interview?.mockId);
    }
    const onFeedback = ()=>{
        router.push("dashboard/interview/"+interview?.mockId+"/feedback");
    }
    return (
    <div className="border shadow-sm rounded-lg p-3">
        <h2 className="font-bold text-fuchsia-500">{interview?.jobPosition}</h2>
        <h2 className="text-sm text-gray-700">Years of Experience: {interview?.jobExperience}</h2>
        <h2 className="text-xs text-gray-500">
            Taken On: {interview?.createdAt}</h2>
        
        <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline" 
            className="border-2 border-fuchsia-500"
            onClick={onFeedback}>Feedback</Button>
            <Button size="sm" 
            className="bg-fuchsia-500"
            onClick={onStart}>Start Again</Button>
        </div>
    </div>
  )
}

export default InterviewCard