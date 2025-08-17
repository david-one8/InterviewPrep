import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Calendar, Briefcase, Clock, Play, BarChart3 } from 'lucide-react'

function InterviewCard({interview}) {
    const router = useRouter();

    const onStart = ()=>{
        router.push("dashboard/interview/"+interview?.mockId);
    }
    const onFeedback = ()=>{
        router.push("dashboard/interview/"+interview?.mockId+"/feedback");
    }
    
    return (
    <div className="group bg-white border border-gray-200 hover:border-fuchsia-300 shadow-sm hover:shadow-lg rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-fuchsia-600 transition-colors overflow-hidden">
                    {interview?.jobPosition}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm">{interview?.jobExperience} years experience</span>
                </div>
            </div>
            <div className="w-12 h-12 bg-fuchsia-100 rounded-full flex items-center justify-center group-hover:bg-fuchsia-200 transition-colors">
                <Play className="h-6 w-6 text-fuchsia-600" />
            </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-500 mb-6">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Taken on {interview?.createdAt}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
            <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 border-fuchsia-200 text-fuchsia-600 hover:bg-fuchsia-50 hover:border-fuchsia-300 transition-all"
                onClick={onFeedback}
            >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Feedback
            </Button>
            <Button 
                size="sm" 
                className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition-all"
                onClick={onStart}
            >
                <Play className="h-4 w-4 mr-2" />
                Start Again
            </Button>
        </div>
    </div>
  )
}

export default InterviewCard