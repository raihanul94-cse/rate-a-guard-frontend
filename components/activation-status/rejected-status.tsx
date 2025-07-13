import { AlertTriangle, RefreshCw, Shield, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function RejectedStatus({ rejectionReasons }: { rejectionReasons: string; }) {
    return (
        <div>
            <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-600 rounded-full">
                        <XCircle className="h-16 w-16 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Verification Issues Found</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    We encountered some issues during the verification process that need to be addressed.
                </p>
            </div>

            <Card className="border-red-200 bg-red-50 shadow-lg mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-800">
                        <AlertTriangle className="h-6 w-6" />
                        Verification Issues
                    </CardTitle>
                    <CardDescription className="text-red-700">
                        The following issues were identified during our review process
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {rejectionReasons.split("\n").map((reason, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                                <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-800">{reason}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-blue-600" />
                        Next Steps
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert>
                        <RefreshCw className="h-4 w-4" />
                        <AlertTitle>Resubmission Process</AlertTitle>
                        <AlertDescription>
                            Please address the issues listed above and resubmit your application. You can update your information
                            through your dashboard or contact our support team for assistance.
                        </AlertDescription>
                    </Alert>

                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Resolve</h3>
                        <ul className="space-y-2 text-blue-800">
                            <li>• Gather the correct documentation for each flagged item</li>
                            <li>• Ensure all information matches official records</li>
                            <li>• Contact our support team if you need clarification</li>
                            <li>• Resubmit your application once issues are resolved</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
