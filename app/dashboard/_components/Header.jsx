"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const path = usePathname();
    const router = useRouter();

    const BackToHome = () => {
        router.push('/dashboard');
        setIsMobileMenuOpen(false);
    }

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', onClick: BackToHome },
        { name: 'Questions', path: '/dashboard/questions', onClick: () => setIsMobileMenuOpen(false) },
        { name: 'Upgrade', path: '/dashboard/upgrade', onClick: () => setIsMobileMenuOpen(false) },
        { name: 'How it works', path: '/dashboard/how-it-works', onClick: () => setIsMobileMenuOpen(false) }
    ];

    return (
    <>
        <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
            <div className="flex flex-row cursor-pointer" onClick={BackToHome}>
                <Image src={'/logo.svg'} width={50} height={44} alt='logo' className="w-10 h-10 sm:w-12 sm:h-12"/>
                <div className="text-xl sm:text-2xl p-2 sm:p-4 font-bold">InterviewPrep</div>
            </div>
            
            {/* Desktop Navigation */}
            <ul className='hidden md:flex gap-6'>
                {navItems.map((item, index) => (
                    <li 
                        key={`desktop-${item.name}-${index}`}
                        onClick={item.onClick}
                        className={`hover:text-fuchsia-500 hover:font-bold transition-all duration-200 cursor-pointer px-3 py-2 rounded-md
                            ${path === item.path ? 'text-fuchsia-500 font-bold bg-fuchsia-50' : 'text-gray-700'}    
                        `}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Button & User Button */}
            <div className="flex items-center gap-3">
                <UserButton afterSignOutUrl="/sign-in" />
                <button 
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? 
                        <X className="h-6 w-6" /> : 
                        <Menu className="h-6 w-6" />
                    }
                </button>
            </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b shadow-lg">
                <ul className='flex flex-col'>
                    {navItems.map((item, index) => (
                        <li 
                            key={`mobile-${item.name}-${index}`}
                            onClick={item.onClick}
                            className={`px-4 py-3 border-b border-gray-100 hover:bg-fuchsia-50 hover:text-fuchsia-500 transition-all duration-200 cursor-pointer
                                ${path === item.path ? 'text-fuchsia-500 font-bold bg-fuchsia-50' : 'text-gray-700'}    
                            `}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>
  )
}

export default Header