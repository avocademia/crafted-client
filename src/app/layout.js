import { Inter } from "next/font/google";
import "./globals.scss";
//import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crafted",
  description: "",
};

/*interface RootLayoutProps {
  children: ReactNode
}*/

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children} 
      </body>
    </html>
  );
}
