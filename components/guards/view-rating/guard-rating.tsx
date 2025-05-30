import React from 'react';
import { ThumbsUp, ThumbsDown, Share, Flag, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IGuardLatestRating } from '@/types/guard';

export function GuardRating({ guardLatestRating }: { guardLatestRating: IGuardLatestRating }) {
    return (
        <Card className="p-6">
            <div className='flex gap-8'>
                <div className="flex flex-col gap-6 mb-6">
                    <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">QUALITY</div>
                        <div className="w-16 h-16 bg-green-100 rounded flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-900">{guardLatestRating.averageRating}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">DIFFICULTY</div>
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-900">{guardLatestRating.averageRating}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <Monitor className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-semibold">{guardLatestRating.uuid}</h2>
                        </div>
                        <span className="text-sm text-gray-500">May 6th, 2025</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                            <span className="text-gray-600">Would you hire again?: </span>
                            <span className="font-medium">{guardLatestRating.rehirable}</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-gray-800 leading-relaxed">{guardLatestRating.review}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs px-3 py-1">
                            Reliable
                        </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">Helpful</span>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    0
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                    <ThumbsDown className="h-4 w-4 mr-1" />
                                    0
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Share className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Flag className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};