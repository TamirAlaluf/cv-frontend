import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Exo_2 } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify multiple weights
  variable: "--font-bricolage", // Optional: for using with Tailwind or CSS variables
});
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify multiple weights
  variable: "--font-exo2", // Optional: for using with Tailwind or CSS variables
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: {
    default: "ResuMate | AI-Powered CV Optimization",
    template: "%s | ResuMate",
  },
  description:
    "ResuMate helps you optimize your CV with AI technology to pass ATS systems and land more interviews.",
  keywords: [
    "CV optimization",
    "resume builder",
    "ATS optimization",
    "job search",
    "career tools",
    "AI resume",
  ],
  verification: {
    google: "mlawQVOvP8hRxENUT6TuVtOr90LiTp3aPY9wBwlOXms",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resumateapp.com",
    siteName: "ResuMate",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "ResuMate - AI-Powered CV Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ResuMate | AI-Powered CV Optimization",
    description:
      "Optimize your CV with AI technology to pass ATS systems and land more interviews.",
    images: ["/favicon.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bricolageGrotesque.className}>
      <body>
        <ClerkProvider dynamic>
          <NavBar />
          {children}
          <Analytics />
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
