import { Suspense } from "react";
import { Metadata } from 'next';
import { CreatePasswordForm } from '@/components/auth/create-password-form';

export const metadata: Metadata = {
    title: 'Create Password | RAG',
    description:
        'RAG helps you review, rate, and find trusted security guards based on real user feedback. Empowering safety with transparency.',
};

export default function CreatePasswordPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Suspense>
                        <CreatePasswordForm />
                    </Suspense>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{' '}
                        <a href="/terms-of-service" className="underline underline-offset-4 hover:text-primary">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
