import { Shield } from 'lucide-react';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingSteps } from '@/components/onboarding/onboarding-steps';

export const metadata: Metadata = {
    title: 'Onboarding | RAG',
    description:
        'RAG helps you review, rate, and find trusted security guards based on real user feedback. Empowering safety with transparency.',
};

export default function OnboardingPage() {
    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-blue-600 rounded-full">
                                <Shield className="h-12 w-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to RAG</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Let&apos;s get you set up with your security company profile. <br />
                            This process will help us verify your credentials and get you connected with the best
                            security professionals.
                        </p>
                    </div>

                    <Card>
                        <CardHeader className="text-start">
                            <CardTitle className="text-xl">Complete Your Profile</CardTitle>
                            <CardDescription className="text-sm">
                                Please provide your company information to get started. All details will be verified for
                                security.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OnboardingSteps />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
