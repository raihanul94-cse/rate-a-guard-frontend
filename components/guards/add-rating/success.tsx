import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SuccessPopupProps {
    guardUuid: string;
    name: string;
}

export function Success({ guardUuid, name }: SuccessPopupProps) {
    return (
        <div className="p-8 text-center">
            <div className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thanks for rating {name}!</h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
                We have added your rating but it is still under review to ensure that it meets <br /> Site Guidelines.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button asChild>
                    <Link href={`/guards/${guardUuid}/view-ratings`}>View Ratings</Link>
                </Button>
            </div>
        </div>
    );
}
