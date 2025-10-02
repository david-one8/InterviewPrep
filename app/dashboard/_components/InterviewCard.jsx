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
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 shadow-sm hover:shadow-lg rounded-xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-200 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors truncate pr-2">
                    {interview?.jobPosition}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                    <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{interview?.jobExperience} years experience</span>
                </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-full flex items-center justify-center group-hover:bg-fuchsia-200 dark:group-hover:bg-fuchsia-900/50 transition-colors flex-shrink-0">
                <Play className="h-5 w-5 sm:h-6 sm:w-6 text-fuchsia-600 dark:text-fuchsia-400" />
            </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">Taken on {interview?.createdAt}</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 border-fuchsia-200 dark:border-fuchsia-800 text-fuchsia-600 dark:text-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-950 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 transition-all text-xs sm:text-sm h-9 sm:h-10"
                onClick={onFeedback}
            >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                View Feedback
            </Button>
            <Button 
                size="sm" 
                className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition-all text-xs sm:text-sm h-9 sm:h-10"
                onClick={onStart}
            >
                <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Start Again
            </Button>
        </div>
    </div>
  )
}

export default InterviewCard