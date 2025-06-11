import { ArrowRight, CheckCircle, Clock, Mail, Shield } from 'lucide-react';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import axiosHelper from '@/lib/axios-helper';
import { TResponse } from '@/types/response';
import { IActivationStatus } from '@/types/user';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Activation Status | RAG',
    description:
        'RAG helps you review, rate, and find trusted security guards based on real user feedback. Empowering safety with transparency.',
};

async function getActivationStatusData() {
    try {
        const response = await axiosHelper.get<TResponse<IActivationStatus>>('/api/user/activation-status');
        if (response.status === 'success') {
            return response.data;
        }
    } catch (error) {
        console.error('Failed to fetch settings data:', error);
    }
    return null;
}

export default async function ActivationStatusPage() {
    const response = await getActivationStatusData();

    if (!response) {
        return (
            <div>
                <h3 className="text-lg font-medium">Activation Status</h3>
                <p className="text-sm text-red-500">Failed to load activation status. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-green-600 rounded-full">
                                <CheckCircle className="h-16 w-16 text-white" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Onboarding Complete!</h1>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                            Thank you for joining RAG. <br />
                            Your information has been successfully submitted.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <Card className="border-green-200 bg-green-50">
                            <CardHeader className="text-center">
                                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                                <CardTitle className="text-green-800">Registration Complete</CardTitle>
                                <CardDescription className="text-green-700">
                                    Your information has been successfully submitted
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {response.company.status === 'pending' ? (
                            <Card className="border-yellow-200 bg-yellow-50">
                                <CardHeader className="text-center">
                                    <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                                    <CardTitle className="text-yellow-800">Under Review</CardTitle>
                                    <CardDescription className="text-yellow-700">
                                        Your information is being verified
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ) : (
                            <Card className="border-green-200 bg-green-50">
                                <CardHeader className="text-center">
                                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                                    <CardTitle className="text-green-800">Verification Complete</CardTitle>
                                    <CardDescription className="text-green-700">
                                        Your information has been successfully verified
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        )}
                    </div>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-6 w-6 text-blue-600" />
                                What Happens Next?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Alert>
                                <Clock className="h-4 w-4" />
                                <AlertTitle>Verification Process</AlertTitle>
                                <AlertDescription>
                                    Our security team is currently reviewing your company information and credentials.
                                    This process typically takes 1-3 business days to ensure all details are accurate
                                    and compliant.
                                </AlertDescription>
                            </Alert>

                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-blue-900 mb-4">Review Checklist</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-blue-800">License number verification</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-blue-800">Business registration validation</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-blue-800">Contact information verification</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-blue-800">Compliance and regulatory checks</span>
                                    </div>
                                </div>
                            </div>

                            <Alert>
                                <Mail className="h-4 w-4" />
                                <AlertTitle>Email Notification</AlertTitle>
                                <AlertDescription>
                                    Once your verification is complete, you&apos;ll receive an email confirmation with
                                    your account activation details. Please check your spam folder if you don&apos;t see
                                    it in your inbox.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                    <div className="text-center space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/dashboard">
                                <Button>
                                    Go to Dashboard <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline">Return to Home</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
