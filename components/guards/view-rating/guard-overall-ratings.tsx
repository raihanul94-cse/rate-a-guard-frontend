import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { IGuardDetails } from '@/types/guard';

export function GuardOverallRatings({ guardDetailsData }: { guardDetailsData: IGuardDetails | null }) {
    const getRatingLabel = (rating: number) => {
        if (rating >= 4.5) return 'Excellent';
        if (rating >= 4.0) return 'Very Good';
        if (rating >= 3.5) return 'Good';
        if (rating >= 3.0) return 'Average';
        if (rating >= 2.0) return 'Poor';
        return 'Very Poor';
    };

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

    const overallRating = guardDetailsData?.overallRatings || 0;

    return (
        <Card className="bg-white p-6 rounded-lg border border-gray-200 h-fit">
            <div className="flex gap-6">
                <div className="flex flex-col items-start">
                    <div className="text-5xl font-bold text-gray-900 mb-1">{overallRating.toFixed(1)}</div>
                    <div className="text-lg font-medium text-gray-900 mb-2">{getRatingLabel(overallRating)}</div>
                    <div className="flex gap-1 mb-2">{renderStars(overallRating)}</div>
                    <div className="text-sm text-gray-600">{guardDetailsData?.guardRatingCount || 0} ratings</div>
                </div>

                <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((starLevel) => {
                        const count = guardDetailsData?.starCounts?.[starLevel] || 0;
                        const total = guardDetailsData?.guardRatingCount || 1;
                        const percentage = (count / total) * 100;

                        return (
                            <div key={starLevel} className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600 w-12">{starLevel}-star</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            starLevel === 5 ? 'bg-green-500' : 'bg-gray-500'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    );
}
