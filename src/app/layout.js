import { Inter } from "next/font/google";
import "./globals.scss";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
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
        <ToastContainer/>
        {children} 
      </body>
    </html>
  );
}
