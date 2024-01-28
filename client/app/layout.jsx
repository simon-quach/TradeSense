import { Inter } from "next/font/google";
import "./globals.css";

import Nav from "../components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TradeSense",
  description: "Navigating market risks with confidence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#fafafa]`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
