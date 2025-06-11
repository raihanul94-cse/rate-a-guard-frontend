import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
            <h1 className="text-6xl font-extrabold mb-4">404</h1>
            <p className="text-lg mb-6">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/">
                <Button>Go back home</Button>
            </Link>
        </div>
    );
}
