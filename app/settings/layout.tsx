import { HomeNavbar } from '@/components/home/home-navbar';
import { SettingsSidebar } from '@/components/settings/settings-sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Settings | RAG',
    description:
        'RAG helps you review, rate, and find trusted security guards based on real user feedback. Empowering safety with transparency.',
};

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1">
                <div className="container mx-auto py-10">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                            <p className="text-muted-foreground mt-2">
                                Manage your account settings and set email preferences.
                            </p>
                        </div>
                        <div
                            data-orientation="horizontal"
                            role="none"
                            className="shrink-0 bg-border h-[1px] w-full my-6"
                        ></div>
                        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                            <SettingsSidebar />
                            <div className="flex-1 lg:max-w-2xl">{children}</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
