import { Metadata } from 'next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HomeNavbar } from '@/components/home/home-navbar';
import { IGuardDetails, IGuardMeta } from '@/types/guard';
import axiosHelper from '@/lib/axios-helper';
import { ISuccessResponse } from '@/types/response';
import { GuardBasicInfo } from '@/components/guards/view-rating/guard-basic-info';
import { GuardOverallRatings } from '@/components/guards/view-rating/guard-overall-ratings';
import { GuardDetails } from '@/components/guards/view-rating/guard-details';
import { GuardRating } from '@/components/guards/view-rating/guard-rating';

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

async function fetchGuardDetailsData(guardUuid: string): Promise<IGuardDetails | null> {
    try {
        const resp = await axiosHelper.get<ISuccessResponse<IGuardDetails>>(
            `/api/guards/${guardUuid}/details`
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
                title: `${guardData?.guard.firstName} ${guardData?.guard.lastName} at ${guardData?.guard.company.companyName}`,
                description: `Explore the ratings and reviews for ${guardData?.guard.firstName} ${guardData?.guard.lastName}. Overall Quality: ${guardData?.overallRatings}/5 based on ${guardData?.guardRatingCount} ratings.`,
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

export default async function ViewRatingsPage({
    params,
}: {
    params: Promise<{ guardUuid: string }>;
}) {
    const { guardUuid } = await params;
    const guardData = await fetchGuardMetaData(guardUuid);

    const guardDetailsData = await fetchGuardDetailsData(guardUuid);

    console.log(guardDetailsData);

    return (
        <div className="relative flex min-h-screen flex-col">
            <HomeNavbar />
            <main className="flex-1">
                <div className="bg-background">
                    <main className="container mx-auto py-8">
                        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                            <GuardBasicInfo guardData={guardData} />

                            <GuardOverallRatings guardDetailsData={guardDetailsData} />

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">All ratings</h2>
                                    <div className="flex items-center gap-4">
                                        <Select defaultValue="recent">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="recent">Most recent</SelectItem>
                                                <SelectItem value="highest">Highest rated</SelectItem>
                                                <SelectItem value="lowest">Lowest rated</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* {reviews.map((review) => (
                                        <Card key={review.id} className="p-6">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback>{review.author[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="font-semibold">{review.author}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {review.date}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {Array(review.rating)
                                                            .fill(null)
                                                            .map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="h-4 w-4 fill-current text-green-500"
                                                                />
                                                            ))}
                                                    </div>
                                                    <h3 className="font-semibold">{review.title}</h3>
                                                    <p className="text-muted-foreground">{review.content}</p>
                                                    {review.dateOfExperience && (
                                                        <div className="text-sm text-muted-foreground">
                                                            Date of experience: {review.dateOfExperience}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    ))} */}

                                    <GuardRating guardLatestRating={guardDetailsData?.guardLatestRating} />
                                </div>
                            </div>

                            <GuardDetails />
                        </div>
                    </main>
                </div>
            </main>
        </div>
    );
}
