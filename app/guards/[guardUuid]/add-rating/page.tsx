import { Metadata } from 'next';
import { RatingGuardForm } from '@/components/guards/add-rating/rating-guard-form';
import { RatingGuardHeader } from '@/components/guards/add-rating/rating-guard-header';
import { HomeNavbar } from '@/components/home/home-navbar';
import axiosHelper from '@/lib/axios-helper';
import { ISuccessResponse } from '@/types/response';
import { IGuardMeta } from '@/types/guard';
import { Success } from '@/components/guards/add-rating/success';

async function fetchGuardMetaData(guardUuid: string): Promise<IGuardMeta | null> {
    try {
        const resp = await axiosHelper.get<ISuccessResponse<IGuardMeta>>(
            `/api/guards/${guardUuid}/meta`
        );


        if (resp.data && resp.status === 'success') {
            return resp.data;
        }
    } catch (error) {
        console.error('Failed to fetch guard data:', error);
    }

    return null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ guardUuid: string }>;
}): Promise<Metadata> {
    try {
        const { guardUuid } = await params;
        const guardData = await fetchGuardMetaData(guardUuid);

        if (guardData) {
            return {
                title: `${guardData.guard.firstName} ${guardData.guard.lastName} at ${guardData.guard.company.companyName}`,
                description: `Give ratings and reviews for ${guardData.guard.firstName} ${guardData.guard.lastName}.`,
            };
        }
    } catch (err) {
        console.error('generateMetadata error:', err);
    }

    return {
        title: 'Guard not found!',
        description: 'Guard not found with this ID. Contact the admin.',
    };
}

export default async function ReviewPage({
    params,
    searchParams,
}: {
    params: Promise<{ guardUuid: string }>;
    searchParams: Promise<{ success?: string }>
}) {
    const { success } = await searchParams;

    const { guardUuid } = await params;
    const guardData = await fetchGuardMetaData(guardUuid);

    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1">
                {
                    success !== undefined ?
                        <Success name={`${guardData?.guard.firstName} ${guardData?.guard.lastName}`} guardUuid={guardData?.guard.uuid || ''} /> :
                        <>
                            <RatingGuardHeader guardData={guardData} />

                            <div className="container mx-auto pt-2 pb-10 max-w-[1224px]">
                                <RatingGuardForm />
                            </div>
                        </>
                }

            </main>
        </div>
    );
}
