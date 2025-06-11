import { Shield, Star, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IGuardDetails } from '@/types/guard';
import Link from 'next/link';

const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />);
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(
                <div key={i} className="relative w-4 h-4">
                    <Star className="w-4 h-4 text-gray-300 absolute" />
                    <div className="overflow-hidden w-1/2">
                        <Star className="w-4 h-4 fill-green-500 text-green-500" />
                    </div>
                </div>
            );
        } else {
            stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
        }
    }
    return stars;
};

export function GuardBasicInfo({ guardDetailsData }: { guardDetailsData: IGuardDetails | null }) {
    return (
        <div className="sticky top-16 z-50 pt-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-start gap-4">
                <div className="h-24 w-24 flex-shrink-0">
                    <Shield className="h-full w-full text-blue-600" />
                </div>

                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-1"
                        >
                            <Info className="mr-1 h-3 w-3" />
                            Claimed profile
                        </Badge>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        {guardDetailsData?.guard.firstName} {guardDetailsData?.guard.lastName}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <span className="text-blue-600 underline cursor-pointer text-sm">
                                Reviews {guardDetailsData?.guardRatingCount || 0}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            {renderStars(guardDetailsData?.overallRatings || 0)}
                        </div>

                        <span className="font-bold text-lg">
                            {guardDetailsData?.overallRatings?.toFixed(1) || '0.0'}
                        </span>

                        <Info className="h-4 w-4 text-gray-400" />
                    </div>

                    <div className="text-blue-600 text-sm">Security Guard Service</div>

                    <div className="flex gap-3 pt-2">
                        <Button asChild>
                            <Link href={`/guards/${guardDetailsData?.guard.uuid}/add-rating`}>Give Rating</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
