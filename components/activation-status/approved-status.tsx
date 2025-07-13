import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ApprovedStatus() {
    return (
        <div>
            <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-600 rounded-full">
                        <CheckCircle className="h-16 w-16 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Verification Approved!</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Congratulations! Your RAG account has been successfully verified and activated.
                </p>
            </div>

            <Card className="border-green-200 bg-green-50 shadow-lg mb-8">
                <CardHeader className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-2xl text-green-800">Account Activated Successfully</CardTitle>
                    <CardDescription className="text-green-700 text-lg">
                        Your company has been verified and your account is now active
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="bg-white p-6 rounded-lg mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Available Now</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-left">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span>Full dashboard access</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span>Guard registration portal</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span>License verification system</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span>Rating and review management</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
