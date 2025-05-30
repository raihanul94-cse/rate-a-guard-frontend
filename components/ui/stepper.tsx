import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface Step {
    legend: string;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stepperVariants> {
    steps: Step[];
    currentStep: number;
}

const stepperVariants = cva('flex items-baseline w-full relative', {
    variants: {
        variant: {
            default: '',
            minimal: 'gap-4',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
    ({ steps, currentStep, className, variant, ...props }, ref) => {
        return (
            <div ref={ref} className={cn(stepperVariants({ variant }), className)} {...props}>
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        {index !== 0 && (
                            <div
                                className={cn(
                                    'flex-1 h-[2px]',
                                    index <= currentStep ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-gray-600'
                                )}
                            />
                        )}

                        <div className="flex flex-col items-center max-w-[3.5rem]">
                            <div
                                className={cn(
                                    'flex items-center justify-center w-10 h-10 rounded-full transition-colors',
                                    index <= currentStep
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                )}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={cn(
                                    'mt-2 text-sm text-center transition-colors',
                                    index <= currentStep
                                        ? 'text-gray-700 font-semibold dark:text-gray-300'
                                        : 'text-gray-500 dark:text-gray-400'
                                )}
                            >
                                {step.legend}
                            </span>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        );
    }
);

Stepper.displayName = 'Stepper';

export { Stepper };
