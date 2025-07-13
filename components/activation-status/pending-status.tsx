import { CheckCircle, Clock, Mail, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function PendingStatus() {
    return (
        <div>
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

                <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader className="text-center">
                        <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                        <CardTitle className="text-yellow-800">Under Review</CardTitle>
                        <CardDescription className="text-yellow-700">
                            Your information is being verified
                        </CardDescription>
                    </CardHeader>
                </Card>
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
        </div>
    );
}
