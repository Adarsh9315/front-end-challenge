import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Welcome to Our Platform',
  description: 'Build amazing things with our powerful and intuitive tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
