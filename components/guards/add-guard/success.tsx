import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessPopupProps {
    onRate: () => void;
    onSkip: () => void;
    name: string;
}

export function Success({ onRate, onSkip, name }: SuccessPopupProps) {
    return (
        <div className="p-8 text-center">
            <div className="mx-auto mb-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thanks for adding {name}!</h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
                We have added your guard! However, the guard information is under review to ensure that it meets <br />{' '}
                Site Guidelines.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-2 text-left">Next Step</h3>
                <p className="text-gray-600 text-left text-sm">Rate {name} to earn 2 tokens and unlock more reviews.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={onSkip} variant="outline" className="flex-1">
                    Skip
                </Button>
                <Button onClick={onRate} className="flex-1">
                    Rate & Earn 2 Tokens
                </Button>
            </div>
        </div>
    );
}
