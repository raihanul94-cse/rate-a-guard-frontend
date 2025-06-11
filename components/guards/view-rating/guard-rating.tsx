import React from 'react';
import { Card } from '@/components/ui/card';
import { IGuardRating } from '@/types/guard';

const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Average';
    if (rating >= 2.0) return 'Poor';
    return 'Very Poor';
};

export function GuardRating({ guardRating }: { guardRating: IGuardRating | undefined }) {
    return (
        <Card className="p-6">
            <div className="flex gap-8">
                <div className="flex flex-col gap-6 mb-6">
                    <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1 uppercase">
                            {getRatingLabel(Number(guardRating?.averageRating))}
                        </div>
                        <div className="w-16 h-16 bg-green-100 rounded flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-900">{guardRating?.averageRating}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1 uppercase">Pro Score</div>
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-900">
                                {Number(guardRating?.professionalismRating).toFixed(1)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-gray-600">Would hire again: </span>
                            <span className="font-medium">{guardRating?.rehirable}</span>
                        </div>
                        <span className="text-sm text-gray-500">May 6th, 2025</span>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-800 leading-relaxed">{guardRating?.review}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
