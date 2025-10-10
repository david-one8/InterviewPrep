'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Sparkles, 
  Mic, 
  MessageSquare, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight,
  Briefcase,
  Volume2,
  Award,
  Lock,
  TrendingUp,
  Play,
  ArrowDown
} from 'lucide-react'

function HowItWorksPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: "01",
      title: "Select Your Role",
      description: "Choose your job role and add technologies from the job description. The AI personalizes questions based on your experience level.",
      icon: Briefcase,
      color: "from-blue-500 to-indigo-600",
      features: ["Job Role Selection", "Technology Stack", "Experience Level"]
    },
    {
      number: "02",
      title: "Talk to AI Interviewer",
      description: "The session begins with 5 real-world questions. You speak your answers naturally — just like an in-person interview.",
      icon: Mic,
      color: "from-purple-500 to-pink-600",
      features: ["Real-time Voice Recognition", "Natural Conversation", "5 Question Session"]
    },
    {
      number: "03",
      title: "Get Instant Feedback",
      description: "Receive detailed analysis of your clarity, tone, pace, content quality, and structure with actionable improvement tips.",
      icon: BarChart3,
      color: "from-emerald-500 to-green-600",
      features: ["Speech Analysis", "Content Feedback", "Improvement Tips"]
    },
    {
      number: "04",
      title: "Review & Practice",
      description: "View performance feedback, track progress, and reattempt questions. Every session adapts to your speaking style.",
      icon: TrendingUp,
      color: "from-orange-500 to-red-600",
      features: ["Progress Tracking", "Performance History", "Smart Adaptation"]
    }
  ]

  const features = [
    {
      icon: MessageSquare,
      title: "AI Interviewer (Text-Based)",
      description: "Engages in natural, human-like conversations",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Volume2,
      title: "Speech Recognition & Analysis",
      description: "Evaluates pronunciation, tone, and clarity",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: BarChart3,
      title: "AI Feedback Dashboard",
      description: "Real-time insights into strengths and weaknesses",
      color: "from-emerald-500 to-green-600"
    },
    {
      icon: Lock,
      title: "Secure Practice Space",
      description: "Your voice data stays private and encrypted",
      color: "from-orange-500 to-red-600"
    }
  ]

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
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step-by-Step Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-indigo-900 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
            🎤 Step-by-Step Process
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onHoverStart={() => setActiveStep(index)}
                className="relative group"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${step.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500`}></div>
                
                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-400 dark:text-gray-600 mb-2">
                        STEP {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {step.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Demo Section - VERTICAL FLOW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/20 dark:border-gray-700/50 shadow-2xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-indigo-900 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
                  🖥️ Visual Demo
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  See how InterviewPrep works in three simple steps
                </p>
              </div>

              {/* VERTICAL STACKED FLOW */}
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Step 1 - Select Role */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 p-6 border border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
                        Select Role
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Choose your job position and tech stack
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Animated Arrow 1 */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowDown className="w-10 h-10 text-indigo-500 dark:text-indigo-400" strokeWidth={2.5} />
                  </motion.div>
                </div>

                {/* Step 2 - Voice Interview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 p-6 border border-purple-200/50 dark:border-purple-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg flex-shrink-0">
                      <Mic className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
                        Voice Interview
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Speak naturally with AI interviewer
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Animated Arrow 2 */}
                <div className="flex justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <ArrowDown className="w-10 h-10 text-purple-500 dark:text-purple-400" strokeWidth={2.5} />
                  </motion.div>
                </div>

                {/* Step 3 - Feedback Dashboard */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 p-6 border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg flex-shrink-0">
                      <BarChart3 className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
                        Feedback Dashboard
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get instant AI-powered insights
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="text-center mt-16">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    &#34;Speak. Improve. Succeed.&#34;
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smart Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-gray-900 to-indigo-900 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
            ⚙️ Smart Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>
                
                <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/50 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-indigo-900 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
                🚀 Ready to speak with your AI interviewer?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Start practicing today and land your dream job with confidence
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  onClick={() => router.push('/dashboard')}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    🎯 Start Interview
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  onClick={() => router.push('/dashboard')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 text-lg font-semibold rounded-2xl hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Try a Demo Session
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HowItWorksPage
