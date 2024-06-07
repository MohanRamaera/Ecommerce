import "../globals.css";
import { Inter } from "next/font/google";
import ModalProvider from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/navbar";
import { RoleGate } from "@/components/role.gate";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ToasterProvider />
          <ModalProvider />
          <Navbar />
          <RoleGate allowedRole="ADMIN" >
          {children}
          </RoleGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
