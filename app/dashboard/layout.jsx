import React from 'react'
import Header from './_components/Header'

export const metadata = {
  title: 'InterviewPrep',
  description: 'Mock AI interviewer',
};

function Dashboardlayout({children}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      {/* Remove all margins to allow children full control */}
      <div className="pb-4">
        {children}
      </div>
    </div>
  )
}

export default Dashboardlayout
