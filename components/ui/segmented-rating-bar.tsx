import React from 'react';
import { cn } from '@/lib/utils';

export interface RatingOption {
    value: number;
    label: string;
    color: string;
}

export interface SegmentedRatingBarProps {
    label?: string;
    options: RatingOption[];
    value: number | null;
    onValueChange: (value: number | null) => void;
    className?: string;
    name?: string;
    error?: string;
}

const SegmentedRatingBar = React.forwardRef<HTMLDivElement, SegmentedRatingBarProps>(
    ({ label = 'Rate this item', options, value, onValueChange, className, name, error }, ref) => {
        const handleClick = (v: number) => {
            onValueChange(value === v ? null : v);
        };

        const currentOption = options.find((opt) => opt.value === value);

        return (
            <div ref={ref} className={cn('p-6 bg-white rounded-lg shadow-md space-y-6', className)}>
                <div className="space-y-2">
                    {label && (
                        <label htmlFor={name} className="text-lg font-semibold text-gray-700">
                            {label}
                        </label>
                    )}

                    <div className="flex justify-center w-full">
                        <div className="relative max-w-md flex-1">
                            <div className="flex items-center w-full h-8 rounded-full overflow-hidden">
                                {options.map((opt) => (
                                    <div
                                        key={opt.value}
                                        className={cn(
                                            `h-full flex-1 border-gray-300 cursor-pointer`,
                                            value && value >= opt.value ? opt.color || 'bg-gray-400' : 'bg-gray-200',
                                            options[options.length - 1].value === opt.value ? '' : 'border-r'
                                        )}
                                        onClick={() => handleClick(opt.value)}
                                    />
                                ))}
                            </div>

                            {value === null ? (
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>
                                        {options[0].value} - {options[0].label}
                                    </span>
                                    <span>
                                        {`${options[options.length - 1].value} - ${options[options.length - 1].label}`}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex justify-center text-xs text-gray-500 mt-1">
                                    <span>{`${value} - ${currentOption?.label ?? ''}`}</span>
                                </div>
                            )}
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                </div>
            </div>
        );
    }
);

SegmentedRatingBar.displayName = 'SegmentedRatingBar';

export { SegmentedRatingBar };
