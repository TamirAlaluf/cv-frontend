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

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
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
export const metadata: Metadata = {
  title: "ResuMate",
  description: "A resume builder for developers",
  icons: {
    icon: "/favicon.png", // Ensure favicon.ico is in the public folder
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
