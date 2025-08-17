# 🎯 InterviewPrep

> **AI-Powered Mock Interview Platform** - Practice interviews with personalized questions, real-time feedback, and detailed performance analytics.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

- 🤖 **AI Question Generation** - Gemini AI creates personalized interview questions based on job role, tech stack, and experience
- 🎥 **Interactive Interview** - Webcam integration with speech-to-text for realistic interview simulation
- 📊 **Smart Feedback** - AI-powered performance analysis with ratings and improvement suggestions
- 🔒 **Secure Authentication** - Clerk-based user management with protected routes
- 📱 **Responsive Design** - Modern UI with shadcn/ui components and Tailwind CSS
- 🎤 **Voice Features** - Text-to-speech question reading and speech recognition for answers

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Frontend** | React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Authentication** | Clerk |
| **Database** | PostgreSQL (Neon) + Drizzle ORM |
| **AI** | Google Gemini API |
| **Voice** | Web Speech API, react-hook-speech-to-text |
| **Media** | react-webcam |

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/david-one8/InterviewPrep.git
   cd InterviewPrep
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   NEXT_PUBLIC_DATABASE_URL=your_neon_database_url
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Database Setup**

   ```bash
   npm run db:push
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |

## 🗂️ Project Structure

```text
app/
├── (auth)/                    # Authentication pages
│   ├── sign-in/
│   └── sign-up/
├── dashboard/                 # Main dashboard
│   ├── _components/           # Dashboard components
│   └── interview/[id]/        # Interview flow
│       ├── start/             # Interview session
│       └── feedback/          # Results & feedback
├── layout.js                 # Root layout with Clerk
└── page.js                   # Home (redirects to dashboard)

components/ui/                 # Reusable UI components
utils/                        # Database & AI utilities
drizzle/                      # Database migrations
```

## 🎯 How It Works

1. **Create Interview** - Input job details and experience level
2. **AI Generation** - Gemini creates 5 personalized questions
3. **Practice Session** - Answer questions with webcam and microphone
4. **Get Feedback** - Receive AI-powered analysis and improvement tips

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Elegant, focused, and built for practice.* ✨
