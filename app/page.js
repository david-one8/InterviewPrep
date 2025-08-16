import { redirect } from 'next/navigation';

export default function Home() {
  // Use server redirect for instant navigation and fewer client re-renders
  redirect('/dashboard');
}
