import { Metadata } from 'next';
import { HomeNavbar } from '@/components/home/home-navbar';
import { IGuardDetails, IGuardMeta } from '@/types/guard';
import axiosHelper from '@/lib/axios-helper';
import { ISuccessResponse } from '@/types/response';
import { GuardBasicInfo } from '@/components/guards/view-rating/guard-basic-info';
import { GuardOverallRatings } from '@/components/guards/view-rating/guard-overall-ratings';
import { GuardDetails } from '@/components/guards/view-rating/guard-details';
import { GuardReviewUnlock } from '@/components/guards/view-rating/guard-review-unlock';
import { GuardRating } from '@/components/guards/view-rating/guard-rating';
import { GuardRatings } from '@/components/guards/view-rating/guard-ratings';
import { notFound } from 'next/navigation';

async function fetchGuardMetaData(guardUuid: string): Promise<IGuardMeta | null> {
    try {
        const resp = await axiosHelper.get<ISuccessResponse<IGuardMeta>>(`/api/guards/${guardUuid}/meta`);

        if (resp.data && resp.status === 'success') {
            return resp.data;
        }
    } catch (error) {
        console.log('Failed to fetch guard data:', error);
    }

    return null;
}

async function fetchGuardDetailsData(guardUuid: string): Promise<IGuardDetails | null> {
    try {
        const resp = await axiosHelper.get<ISuccessResponse<IGuardDetails>>(`/api/guards/${guardUuid}/details`);

        if (resp.data && resp.status === 'success') {
            return resp.data;
        }
    } catch (error) {
        console.log('Failed to fetch guard data:', error);
    }

    return null;
}

export async function generateMetadata({ params }: { params: Promise<{ guardUuid: string }> }): Promise<Metadata> {
    try {
        const { guardUuid } = await params;
        const guardData = await fetchGuardMetaData(guardUuid);

        if (guardData) {
            return {
                title: `${guardData?.guard.firstName} ${guardData?.guard.lastName} at ${guardData?.guard.company.companyName}`,
                description: `Explore the ratings and reviews for ${guardData?.guard.firstName} ${guardData?.guard.lastName}. Overall Quality: ${guardData?.overallRatings}/5 based on ${guardData?.guardRatingCount} ratings.`,
            };
        }
    } catch (err) {
        console.log('generateMetadata error:', err);
    }

    return {
        title: 'Guard not found!',
        description: 'Guard not found with this ID. Contact the admin.',
    };
}

export default async function ViewRatingsPage({ params }: { params: Promise<{ guardUuid: string }> }) {
    const { guardUuid } = await params;
    const guardDetailsData = await fetchGuardDetailsData(guardUuid);

    if (!guardDetailsData) {
        return notFound();
    }

    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1">
                <div className="bg-background">
                    <main className="container mx-auto py-8">
                        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                            <GuardBasicInfo guardDetailsData={guardDetailsData} />

                            <GuardOverallRatings guardDetailsData={guardDetailsData} />

                            {guardDetailsData?.hasGuardReviewAccess ? (
                                <GuardRatings />
                            ) : (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <GuardRating guardRating={guardDetailsData?.guardLatestRating} />
                                        <GuardReviewUnlock />
                                    </div>
                                </div>
                            )}

                            <GuardDetails guardDetailsData={guardDetailsData} />
                        </div>
                    </main>
                </div>
            </main>
        </div>
    );
}
