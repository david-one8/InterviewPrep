"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useMemo, useState } from 'react';
import InterviewCard from './InterviewCard';

function InterviewList() {
  const { user, isLoaded } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const userEmail = useMemo(
    () => user?.primaryEmailAddress?.emailAddress ?? null,
    [user]
  );

  useEffect(() => {
    if (!isLoaded || !userEmail) return;
    let isActive = true;
    (async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.createdBy, userEmail))
          .orderBy(desc(MockInterview.id));
        if (isActive) setInterviewList(result);
      } catch (e) {
        console.error('Failed to load interview list', e);
      }
    })();
    return () => {
      isActive = false;
    };
  }, [isLoaded, userEmail]);

  if (!isLoaded) return null;

  if (interviewList.length === 0) {
    return <div />;
  }

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Attempted Interviews</h2>
      <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-5 my-5">
        {interviewList.map((interview, index) => (
          <InterviewCard key={index} interview={interview} />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;