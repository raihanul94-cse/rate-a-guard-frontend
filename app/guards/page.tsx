import { Guards } from '@/components/guards/guards';
import { HomeNavbar } from '@/components/home/home-navbar';

export default function GuardsPage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1">
                <div className="container mx-auto py-10">
                    <Guards />
                </div>
            </main>
        </div>
    );
}
