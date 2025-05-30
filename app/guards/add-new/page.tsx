import { AddGuardForm } from '@/components/guards/add-guard/add-guard-form';
import { HomeNavbar } from '@/components/home/home-navbar';

export default function AddNewPage() {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1">
                <AddGuardForm />
            </main>
        </div>
    );
}
