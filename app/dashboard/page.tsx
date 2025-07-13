export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { HomeNavbar } from '@/components/home/home-navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Building2, Coins, Edit3, RefreshCw, Search, UserPlus } from 'lucide-react';
import axiosHelper from '@/lib/axios-helper';
import { TResponse } from '@/types/response';
import { IActivationStatus, IUserTokenResponse, IUserWithCompanyResponse } from '@/types/user';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

async function getActivationStatusData() {
    try {
        const response = await axiosHelper.get<TResponse<IActivationStatus>>('/api/user/activation-status');
        if (response.status === 'success') {

            return response.data;
        }
    } catch (error) {
        console.log('Failed to fetch settings data:', error);
    }
    return null;
}

async function getUserProfileData() {
    try {
        const response = await axiosHelper.get<TResponse<IUserWithCompanyResponse>>('/api/user/profile');
        if (response.status === 'success') {
            return response.data;
        }
    } catch (error) {
        console.log('Failed to fetch settings data:', error);
    }
    return null;
}

async function getUserTokensData() {
    try {
        const response = await axiosHelper.get<TResponse<IUserTokenResponse>>('/api/user/tokens');
        if (response.status === 'success') {
            return response.data;
        }
    } catch (error) {
        console.log('Failed to fetch settings data:', error);
    }
    return null;
}

export default async function DashboardPage() {
    const companyStatus = await getActivationStatusData();
    const user = await getUserProfileData();
    const token = await getUserTokensData();

    if (!user) {
        return (
            <div>
                <h3 className="text-lg font-medium">Dashboard</h3>
                <p className="text-sm text-red-500">Failed to company information. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />

            <main className="flex-1">
                <div className="container mx-auto py-10">
                    <div className="mb-8">
                        <h1 className="text-2xl font-medium">Dashboard</h1>
                        <p className="text-sm text-muted-foreground">Manage your company information</p>
                    </div>

                    {
                        companyStatus?.company.status === 'rejected' &&
                        <Alert variant="destructive" className="mb-8">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Verification Issues Detected</AlertTitle>
                            <AlertDescription className="mt-2">
                                Your company verification has been rejected due to the following issues:
                                <div className="mt-3 space-y-2">
                                    {companyStatus?.company?.rejectionReasons.split("\n").map((reason, index) => (
                                        <div key={index} className="flex items-start gap-2 p-2 bg-red-50 rounded-md">
                                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-sm text-red-800">{reason}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <Link href="/settings">
                                        <Button variant="outline" size="sm" className=" text-red-600 border-red-200 hover:bg-red-50 hover:text-red-500">
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Update Information
                                        </Button>
                                    </Link>
                                </div>
                            </AlertDescription>
                        </Alert>
                    }

                    {
                        companyStatus?.company.status === 'pending' &&
                        <Alert className="mb-8 border-yellow-200 bg-yellow-50">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <AlertTitle className="text-yellow-800">Verification In Progress</AlertTitle>
                            <AlertDescription className="text-yellow-700">
                                Your company information is currently being reviewed. This process typically takes 1-3 business days.
                                You&apos;ll receive an email notification once verification is complete.
                            </AlertDescription>
                        </Alert>
                    }

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <Card className="h-full">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Building2 className="h-5 w-5" />
                                            <span>Company Information</span>
                                        </CardTitle>
                                        <CardDescription>Your registered company details</CardDescription>
                                    </div>
                                    <Link href="/settings">
                                        <Button variant="outline" size="sm">
                                            <Edit3 className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                    </Link>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Company Name</p>
                                            <p>{user.company.companyName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">License Number</p>
                                            <p>{user.company.licenseNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">License Type</p>
                                            <p>{user.company.licenseType}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                                            <Badge variant="secondary">{user.company.status}</Badge>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                                            <p>{user.company.emailAddress}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                            <p>{user.company.phoneNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Location</p>
                                            <p>
                                                {user.company.city}, {user.company.state}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Coins className="h-5 w-5" />
                                        <span>Token Balance</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold mb-2">{token?.tokenBalance ?? 0}</div>
                                        <p className="text-sm">Available Tokens</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                    <CardDescription>Common tasks and operations</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Link href="/guards/add-new" className="block">
                                        <Button className="w-full justify-start">
                                            <UserPlus className="h-4 w-4 mr-2" />
                                            Register a Guard
                                        </Button>
                                    </Link>
                                    <Link href="/search-license" className="block">
                                        <Button variant="outline" className="w-full justify-start">
                                            <Search className="h-4 w-4 mr-2" />
                                            Search a License
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your recent actions on the platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-2 border-b">
                                    <div>
                                        <p className="font-medium">Registered guard: John Smith</p>
                                        <p className="text-sm">License #GS-2024-145</p>
                                    </div>
                                    <div className="text-sm">2 hours ago</div>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b">
                                    <div>
                                        <p className="font-medium">Searched license: Maria Garcia</p>
                                        <p className="text-sm">License #GS-2024-132</p>
                                    </div>
                                    <div className="text-sm">1 day ago</div>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="font-medium">Updated company information</p>
                                        <p className="text-sm">Phone number updated</p>
                                    </div>
                                    <div className="text-sm">3 days ago</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}
                </div>
            </main>
        </div>
    );
}
