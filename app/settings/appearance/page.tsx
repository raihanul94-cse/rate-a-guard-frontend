import { AppearanceForm } from '@/components/settings/appearance-form';

export default function SettingsAppearancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Appearance</h3>
                <p className="text-sm text-muted-foreground">
                    Customize the appearance of the app. Automatically switch between day and night themes.
                </p>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
            <AppearanceForm />
        </div>
    );
}
