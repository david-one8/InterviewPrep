"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const path = usePathname();
    const router = useRouter();

    // Detect scroll for glassmorphism effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const BackToHome = () => {
        router.push('/dashboard');
        setIsMobileMenuOpen(false);
    }

    const navItems = [
        { 
            name: 'Dashboard', 
            path: '/dashboard', 
            onClick: () => {
                router.push('/dashboard');
                setIsMobileMenuOpen(false);
            }
        },
        { 
            name: 'Upgrade', 
            path: '/dashboard/upgrade', 
            onClick: () => {
                router.push('/dashboard/upgrade');
                setIsMobileMenuOpen(false);
            }
        },
        { 
            name: 'How it works', 
            path: '/dashboard/how-it-works', 
            onClick: () => {
                router.push('/dashboard/how-it-works');
                setIsMobileMenuOpen(false);
            }
        }
    ];

    return (
        <>
            {/* Main Header with Glassmorphism */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`sticky top-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
                        : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-700/30'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo Section */}
                        <motion.div 
                            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                            onClick={BackToHome}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                                <Image 
                                    src={'/logo.svg'} 
                                    width={24} 
                                    height={24} 
                                    alt='InterviewPrep Logo' 
                                    className="filter brightness-0 invert"
                                />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
                                InterviewPrep
                            </span>
                        </motion.div>
                        
                        {/* Desktop Navigation */}
                        <nav className='hidden md:flex items-center gap-2'>
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={`desktop-${item.name}-${index}`}
                                    onClick={item.onClick}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                                        path === item.path 
                                            ? 'text-white' 
                                            : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                                    }`}
                                >
                                    {path === item.path && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </motion.button>
                            ))}
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            {/* Theme Toggle */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ThemeToggle />
                            </motion.div>

                            {/* User Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <UserButton afterSignOutUrl="/sign-in" />
                            </motion.div>

                            {/* Mobile Menu Button */}
                            <motion.button 
                                className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Toggle mobile menu"
                            >
                                <AnimatePresence mode="wait">
                                    {isMobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Navigation Menu with Animations */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed top-16 sm:top-20 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden"
                    >
                        <nav className='flex flex-col p-4 space-y-2'>
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={`mobile-${item.name}-${index}`}
                                    onClick={item.onClick}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        path === item.path 
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        {path === item.path && (
                                            <motion.span
                                                layoutId="mobileDot"
                                                className="w-2 h-2 rounded-full bg-white"
                                                transition={{ type: "spring", bounce: 0.2 }}
                                            />
                                        )}
                                        {item.name}
                                    </span>
                                </motion.button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Header
