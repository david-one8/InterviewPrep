import { Lightbulb, Volume2, Clock, MessageCircle } from 'lucide-react'
import React from 'react'

const QuestionSection = ({mockInterviewQuestions, activeQuestionIndex}) => {
  
    const textToSpeech = (text) =>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance();
            speech.text = text;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;
            window.speechSynthesis.speak(speech);
        }else{
            alert('Your browser does not support text to speech.')
        }
    }
    
    return mockInterviewQuestions && (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
        {/* Progress Header */}
        <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">Interview Questions</h2>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Question {activeQuestionIndex + 1} of {mockInterviewQuestions.length}
                </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                <div 
                    className="bg-fuchsia-600 dark:bg-fuchsia-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                    style={{width: `${((activeQuestionIndex + 1) / mockInterviewQuestions.length) * 100}%`}}
                ></div>
            </div>
        </div>

        {/* Question Navigation Pills */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {mockInterviewQuestions && mockInterviewQuestions.map((question, index) =>(
                <div 
                    key={`question-${index}`} 
                    className={`relative p-2 sm:p-3 rounded-lg text-center text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer min-h-[40px] sm:min-h-[48px] flex items-center justify-center touch-manipulation
                        ${activeQuestionIndex === index 
                            ? 'bg-fuchsia-600 text-white shadow-lg scale-105' 
                            : activeQuestionIndex > index 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                >
                    {activeQuestionIndex > index && (
                        <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}
                    <span className="block">Q{index + 1}</span>
                </div>
            ))}
        </div>

        {/* Current Question */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-2">
                <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-fuchsia-600 dark:text-fuchsia-400 mr-2 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Current Question</span>
                </div>
                <button 
                    onClick={() => textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.Question)}
                    className="flex items-center px-3 py-1.5 sm:py-1 bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-400 rounded-full hover:bg-fuchsia-200 dark:hover:bg-fuchsia-900/50 transition-colors text-xs sm:text-sm touch-manipulation min-h-[36px] sm:min-h-[32px] self-start"
                >
                    <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Listen
                </button>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                {mockInterviewQuestions[activeQuestionIndex]?.Question}
            </h3>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
            <div className="flex items-start">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1 sm:mb-2 text-sm sm:text-base">Interview Tips</h4>
                    <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-400 space-y-0.5 sm:space-y-1">
                        <li>• Take your time to think before answering</li>
                        <li>• Speak clearly and at a moderate pace</li>
                        <li className="hidden sm:list-item">• Use specific examples when possible</li>
                        <li>• Click &quot;Record Answer&quot; when you&apos;re ready to respond</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuestionSection