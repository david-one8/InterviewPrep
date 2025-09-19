"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { asc, desc, eq } from 'drizzle-orm';
import React, { useEffect, useMemo, useMemo as useReactMemo, useState } from 'react';
import InterviewCard from './InterviewCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function InterviewList() {
  const { user, isLoaded } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("desc");

  const userEmail = useMemo(
    () => user?.primaryEmailAddress?.emailAddress ?? null,
    [user]
  );

  useEffect(() => {
    if (!isLoaded || !userEmail) return;
    let isActive = true;
    (async () => {
      try {
        const base = db.select().from(MockInterview).where(eq(MockInterview.createdBy, userEmail));
        const result = await (sort === 'asc' ? base.orderBy(asc(MockInterview.id)) : base.orderBy(desc(MockInterview.id)));
        if (isActive) setInterviewList(result);
      } catch (e) {
        console.error('Failed to load interview list', e);
      }
    })();
    return () => {
      isActive = false;
    };
  }, [isLoaded, userEmail, sort]);

  if (!isLoaded) return null;

  const filtered = interviewList.filter((i) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      i.jobPosition?.toLowerCase().includes(q) ||
      i.jobDesc?.toLowerCase().includes(q)
    );
  });

  if (interviewList.length === 0) {
    return <div />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h2 className="font-medium text-lg sm:text-xl">Previous Attempted Interviews</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Input
            placeholder="Search by role or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-64"
            aria-label="Search interviews"
          />
          <Button 
            variant="outline" 
            onClick={() => setSort((s) => (s === 'asc' ? 'desc' : 'asc'))}
            className="w-full sm:w-auto"
          >
            Sort {sort === 'asc' ? '↑' : '↓'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 my-5">
        {filtered.map((interview, index) => (
          <InterviewCard key={index} interview={interview} />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;