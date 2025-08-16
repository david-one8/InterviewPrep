"use client";
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation';
function Header() {
    
    const path = usePathname();
    const router = useRouter();

    const BackToHome = () => {
        router.push('/dashboard');
    }

    return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm cursor-pointer">
        <div className="flex flex-row" onClick={BackToHome}>
            <Image src={'/logo.svg'} width={50} height={44} alt='logo'></Image>
            <div className="text-2xl p-4 font-bold">InterviewPrep</div>
        </div>
        <ul className='flex gap-6 max-md:hidden'>
            <li onClick={BackToHome}
            className={`hover:text-fuchsia-500 hover:font-bold transition cursor-pointer
                ${path == '/dashboard' && 'text-fuchsia-500 font-bold underline'}    
            `}>
                Dashboard
            </li>
            <li className={`hover:text-fuchsia-500 hover:font-bold transition cursor-pointer
                ${path == '/dashboard/questions' && 'text-fuchsia-500 font-bold underline'}    
            `}>
                Questions
            </li>
            <li className={`hover:text-fuchsia-500 hover:font-bold transition cursor-pointer
                ${path == '/dashboard/upgrade' && 'text-fuchsia-500 font-bold underline'}    
            `}>
                Upgrade
            </li>
            <li className={`hover:text-fuchsia-500 hover:font-bold transition cursor-pointer
                ${path == '/dashboard/how-it-works' && 'text-fuchsia-500 font-bold underline'}    
            `}>
                How it works
            </li>
        </ul>
        <UserButton></UserButton>
    </div>
  )
}

export default Header