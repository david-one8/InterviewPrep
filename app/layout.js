import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InterviewPrep",
  description: "Get ready for your interviews with AI-powered practice.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/sign-in"
    >
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-right"></Toaster>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
