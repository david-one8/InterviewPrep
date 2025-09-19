import React from 'react'
import Header from './_components/Header'

export const metadata = {
  title: 'InterviewPrep',
  description:
    'Mock AI interviewer',
};
function Dashboardlayout({children}) {
  return (
    <div>
        <Header></Header>
        <div className="mx-3 md:mx-8 lg:mx-16">
          {children}
        </div>
    </div>
  )
}

export default Dashboardlayout