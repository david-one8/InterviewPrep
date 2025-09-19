import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { NewInterview } from './_components/NewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Interview Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Practice interviews with 
            <span className="inline-flex items-center mx-2 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white">
              ✨ AI-Generated Questions
            </span>
            and get detailed feedback to ace your next interview.
          </p>
        </div>

        {/* New Interview Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Start a New Interview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NewInterview />
            
            {/* Quick Stats Cards */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">AI-Powered</h3>
                  <p className="text-sm text-gray-500">Personalized questions</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Real Feedback</h3>
                  <p className="text-sm text-gray-500">Detailed analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interview List */}
        <InterviewList />
      </div>
    </div>
  )
}

export default Dashboard