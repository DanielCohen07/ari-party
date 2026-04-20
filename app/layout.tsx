import type { Metadata } from "next";
import { Assistant, Bebas_Neue, Secular_One } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-assistant",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const secularOne = Secular_One({
  subsets: ["hebrew", "latin"],
  weight: ["400"],
  variable: "--font-secular",
});

export const metadata: Metadata = {
  title: "ארי חוגג 50 – יאסו!",
  description: "חגיגת יובל בהפתעה – 7 במאי 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${bebasNeue.variable} ${secularOne.variable} h-full`}
    >
      <body className={`${assistant.className} antialiased min-h-full`}>
        {children}
      </body>
    </html>
  );
}
