import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Uptown Barber Shop | Windsor, Ontario",
  description:
    "Professional men's and kids' haircuts, beard trims, and grooming services in Windsor, Ontario.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
