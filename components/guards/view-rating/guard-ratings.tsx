'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GuardRating } from '@/components/guards/view-rating/guard-rating';
import { IGuardRating } from '@/types/guard';
import { useTable } from '@/hooks/use-table';
import { useParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export function GuardRatings() {
    const { guardUuid } = useParams<{ guardUuid: string }>();
    const { data, isLoading, order, setOrder } = useTable<IGuardRating>({
        apiUrl: `/api/guard-ratings/${guardUuid}`,
        limit: 10,
        initialOrder: {
            sortBy: 'recent',
        },
    });

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">All ratings</h2>
                <div className="flex items-center gap-4">
                    <Select
                        value={order.sortBy}
                        onValueChange={(value) => {
                            setOrder({ ...order, sortBy: value });
                        }}
                    >
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
                {data.map((guardRating) => (
                    <GuardRating key={guardRating.uuid} guardRating={guardRating} />
                ))}
            </div>
        </div>
    );
}
