// app/layout.tsx
// Root layout — wraps every page in the app.

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:       "Signal",
  description: "Signal Messenger Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ height: "100vh", overflow: "hidden" }}>
        {children}
      </body>
    </html>
  );
}