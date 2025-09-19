import React from 'react'
import Header from './_components/Header'

export const metadata = {
  title: 'InterviewPrep',
  description:
    'Mock AI interviewer',
};
function Dashboardlayout({children}) {
  return (
    <div className="min-h-screen bg-gray-50">
        <Header></Header>
        <div className="mx-2 sm:mx-4 md:mx-8 lg:mx-16 pb-4">
          {children}
        </div>
    </div>
  )
}

export default Dashboardlayout