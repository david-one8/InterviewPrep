'use client'
import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { NewInterview } from './_components/NewInterview'
import InterviewList from './_components/InterviewList'
import { Sparkles, Zap, Target, ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react'

function Dashboard() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl"
        />
        
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 bg-indigo-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Full-Width Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-screen text-center mb-16 pt-12 pb-8 px-6 sm:px-8 lg:px-12 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/50 dark:border-indigo-500/30 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            AI-Powered Interview Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent">
            Ace Your Next Interview
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            With AI Confidence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Practice with AI-generated questions tailored to your role, get instant feedback,
          and build the confidence you need to land your dream job.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-3 mb-12"
        >
          <motion.button
            onClick={() => setOpenDialog(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Your First Practice Session
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free to start • No credit card required • Ready in 2 minutes
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">AI-Powered</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instant Feedback</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <Target className="w-4 h-4 text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Role-Specific</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/20 dark:border-gray-700/50 shadow-2xl">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="flex-1 h-8 ml-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center px-4"></div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="h-6 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 rounded-lg w-32"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-lg"></div>
                    <div className="h-8 w-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-lg"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="h-6 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800 rounded-lg w-3/4"></motion.div>
                  <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 rounded-lg w-full opacity-60"></div>
                  <div className="h-4 bg-gradient-to-r from-indigo-200 to-blue-200 dark:from-indigo-800 dark:to-blue-800 rounded-lg w-5/6 opacity-60"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <motion.div whileHover={{ scale: 1.02 }} className="h-40 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-2xl p-4 border border-indigo-200/50 dark:border-indigo-700/50">
                    <div className="w-10 h-10 bg-indigo-200 dark:bg-indigo-800 rounded-lg mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-indigo-300 dark:bg-indigo-700 rounded w-3/4"></div>
                      <div className="h-2 bg-indigo-200 dark:bg-indigo-800 rounded w-full"></div>
                      <div className="h-2 bg-indigo-200 dark:bg-indigo-800 rounded w-5/6"></div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl p-4 border border-purple-200/50 dark:border-purple-700/50">
                    <div className="w-10 h-10 bg-purple-200 dark:bg-purple-800 rounded-lg mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-purple-300 dark:bg-purple-700 rounded w-3/4"></div>
                      <div className="h-2 bg-purple-200 dark:bg-purple-800 rounded w-full"></div>
                      <div className="h-2 bg-purple-200 dark:bg-purple-800 rounded w-5/6"></div>
                    </div>
                  </motion.div>
                </div>
                <div className="pt-4">
                  <div className="h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <div className="h-4 w-32 bg-white/30 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Start Your Practice Session</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NewInterview openDialog={openDialog} setOpenDialog={setOpenDialog} />
            <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.3)" }} className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">AI-Powered Questions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Personalized questions adapted to your experience level and target role</p>
                </div>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.3)" }} className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Instant Feedback</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Detailed analysis of your responses with actionable improvement tips</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.6 }}>
          <InterviewList />
        </motion.div>
      </div>

      {/* 4-Column Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative z-10 mt-24 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-lg"></div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  InterviewPrep
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                AI-powered interview practice platform to help you land your dream job.
              </p>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://x.com/davidfule18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/davidfule/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/david-one8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:davidfule18@gmail.com"
                  className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                >
                  <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Interview Tips</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a></li>
                <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200/50 dark:border-gray-800/50 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 InterviewPrep. Built with Next.js & Google Gemini AI.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default Dashboard
