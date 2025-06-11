import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-provider';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'RAG',
    description:
        'RAG helps you review, rate, and find trusted security guards based on real user feedback. Empowering safety with transparency.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(inter.className, 'min-h-screen bg-background antialiased')}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
