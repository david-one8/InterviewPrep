import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionSection = ({mockInterviewQuestions, activeQuestionIndex}) => {
  
    const textToSpeech = (text) =>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance();
            speech.text = text;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 2;
            window.speechSynthesis.speak(speech);
        }else{
            alert('Your browser does not support text to speech.')
        }
    }
    return mockInterviewQuestions && (
    <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {mockInterviewQuestions && mockInterviewQuestions.map((question, index) =>(
                <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm
                text-center cursor-pointer
                ${activeQuestionIndex == index && 'text-fuchsia-500 font-bold border-2 border-fuchsia-500'}`}>
                    Question {index+1}</h2>
            ) )}
        </div>
        <h2 className="my-5 text-md md:text-lg">
            {mockInterviewQuestions[activeQuestionIndex]?.Question}
        </h2>
        <Volume2 className="cursor-pointer" onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.Question)}></Volume2>
        <div className="border rounded p-5 bg-blue-100 mt-16">
            <h2 className="flex gap-2 item-center text-blue-800">
                <Lightbulb></Lightbulb>
                <strong>Note:</strong>
            </h2>
            <h2 className="text-sm my-2 pl-1 text-blue-600">
                Click on Record Answer when you want to answer the question. At
                the end of interview we will give you the feedback along with
                correct answer for each of question and your answer to compare it.
            </h2>
        </div>
    </div>
  )
}

export default QuestionSection