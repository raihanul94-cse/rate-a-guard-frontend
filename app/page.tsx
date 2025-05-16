import { HomeNavbar } from '@/components/home/home-navbar';

export default function HomePage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1"></main>
        </div>
    );
}
