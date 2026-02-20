import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ajo Loop - Traditional Savings Groups | Build Wealth Together",
    template: "%s | Ajo Loop"
  },
  description: "Join trusted ajo savings groups and build wealth together with your community. Secure, transparent, and proven traditional savings system with guaranteed returns.",
  keywords: [
    "ajo savings",
    "traditional savings",
    "rotating savings",
    "community savings",
    "group savings",
    "financial inclusion",
    "wealth building",
    "Nigeria savings",
    "Ghana savings",
    "African savings"
  ],
  authors: [{ name: "Ajo Loop Team" }],
  creator: "Ajo Loop",
  publisher: "Ajo Loop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ajoloop.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ajoloop.com",
    title: "Ajo Loop - Traditional Savings Groups | Build Wealth Together",
    description: "Join trusted ajo savings groups and build wealth together with your community. Secure, transparent, and proven traditional savings system.",
    siteName: "Ajo Loop",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ajo Loop - Traditional Savings Groups",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajo Loop - Traditional Savings Groups | Build Wealth Together",
    description: "Join trusted ajo savings groups and build wealth together with your community. Secure, transparent, and proven traditional savings system.",
    images: ["/og-image.jpg"],
    creator: "@ajoloop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${firaSans} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>
          <div id="main-content">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
