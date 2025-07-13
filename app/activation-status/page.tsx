export const dynamic = 'force-dynamic';

import { ArrowRight, LogOut } from 'lucide-react';
import { Metadata } from 'next';
import axiosHelper from '@/lib/axios-helper';
import { TResponse } from '@/types/response';
import { IActivationStatus } from '@/types/user';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PendingStatus } from '@/components/activation-status/pending-status';
import { ApprovedStatus } from '@/components/activation-status/approved-status';
import { RejectedStatus } from '@/components/activation-status/rejected-status';

export const metadata: Metadata = {
    title: 'Activation Status | RAG',
    description:
        'RAG helps you review, rate, and find trusted security guards based on real user feedback. Empowering safety with transparency.',
};

async function getActivationStatusData() {
    try {
        const response = await axiosHelper.get<TResponse<IActivationStatus>>('/api/user/activation-status');
        if (response.status === 'success') {
            console.log(response.data);

            return response.data;
        }
    } catch (error) {
        console.log('Failed to fetch settings data:', error);
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

    function renderStatus() {
        if (response?.company?.status === 'pending') {
            return <PendingStatus />;
        } else if (response?.company?.status === 'approved') {
            return <ApprovedStatus />;
        } else if (response?.company?.status === 'rejected') {
            return <RejectedStatus rejectionReasons={response?.company?.rejectionReasons} />;
        }
    }

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
            <div className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    {renderStatus()}
                    <div className="text-center space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {
                                response.company.status !== 'pending' &&
                                <Link href="/dashboard">
                                    <Button>
                                        Go to Dashboard <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                            }
                            <Link href="/">
                                <Button variant="outline">Return to Home</Button>
                            </Link>
                            <Link href="/logout">
                                <Button
                                    variant="outline"
                                    className=" text-red-600 border-red-200 hover:bg-red-50 hover:text-red-500"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
