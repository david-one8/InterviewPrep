"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useMemo, useState } from 'react';
import InterviewCard from './InterviewCard';
import { LoaderCircle } from 'lucide-react';

// Skeleton loader component
const InterviewCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
    </div>
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
    <div className="flex gap-3">
      <div className="h-9 bg-gray-200 rounded flex-1"></div>
      <div className="h-9 bg-gray-200 rounded flex-1"></div>
    </div>
  </div>
);

function InterviewList() {
  const { user, isLoaded } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = useMemo(
    () => user?.primaryEmailAddress?.emailAddress ?? null,
    [user]
  );

  useEffect(() => {
    if (!isLoaded || !userEmail) return;
    
    let isActive = true;
    setLoading(true);
    setError(null);
    
    (async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.createdBy, userEmail))
          .orderBy(desc(MockInterview.id));
        
        if (isActive) {
          setInterviewList(result);
          setLoading(false);
        }
      } catch (e) {
        console.error('Failed to load interview list', e);
        if (isActive) {
          setError('Failed to load interviews. Please try again.');
          setLoading(false);
        }
      }
    })();
    
    return () => {
      isActive = false;
    };
  }, [isLoaded, userEmail]);

  if (!isLoaded) return null;

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="font-semibold text-xl text-gray-800">Previous Interview Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <InterviewCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="font-semibold text-xl text-gray-800">Previous Interview Sessions</h2>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 mb-3">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-red-700 hover:text-red-800 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (interviewList.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="font-semibold text-xl text-gray-800">Previous Interview Sessions</h2>
        <div className="text-center py-12">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <LoaderCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-700 mb-2">No interviews yet</h3>
            <p className="text-gray-500 text-sm">Create your first mock interview to get started</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl text-gray-800">Previous Interview Sessions</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {interviewList.length} interview{interviewList.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewList.map((interview, index) => (
          <InterviewCard key={`interview-${interview.mockId}-${index}`} interview={interview} />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;