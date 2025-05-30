'use client';

import { useState } from 'react';
import { Stepper } from '@/components/ui/stepper';
import { PersonalInfoForm } from './personal-info-form';
import { AddressForm } from './address-form';
import { LicenseForm } from './license-form';
import { useToast } from '@/hooks/use-toast';
import { genericClient } from '@/lib/generic-api-helper';
import { useRouter } from 'next/navigation';
import { Success } from './success';
import { IGuard } from '@/types/guard';

export function AddGuardForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [values, setValues] = useState<Record<string, unknown>>({});
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [guard, setGuard] = useState<IGuard | null>(null);

    function goNextStep() {
        setActiveStepIndex((index) => index + 1);
    }

    function goPrevStep() {
        setActiveStepIndex((index) => index - 1);
    }

    function handleNextStep(stepValues: Record<string, unknown>) {
        setValues((prev) => ({ ...prev, ...stepValues }));
        goNextStep();
    }

    function handleBackStep(stepValues: Record<string, unknown>) {
        setValues((prev) => ({ ...prev, ...stepValues }));
        goPrevStep();
    }

    async function handleSubmitGuardInfo(stepValues: Record<string, unknown>) {
        setIsSubmitting(true);

        try {
            const response = await genericClient({
                url: '/api/user/guards',
                method: 'post',
                data: { ...values, ...stepValues },
            });

            if (response.status === 'success') {
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: 'Guard added successfully.',
                });
                setValues({});
                setIsSuccess(true);
                setGuard(response.data);
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    const steps = [
        {
            legend: 'Personal Info',
            content: (
                <PersonalInfoForm
                    defaultValues={values}
                    handleNextStep={handleNextStep}
                    handleBackStep={handleBackStep}
                />
            ),
        },
        {
            legend: 'Address',
            content: (
                <AddressForm defaultValues={values} handleNextStep={handleNextStep} handleBackStep={handleBackStep} />
            ),
        },
        {
            legend: 'License',
            content: (
                <LicenseForm
                    defaultValues={values}
                    handleNextStep={handleSubmitGuardInfo}
                    handleBackStep={handleBackStep}
                    isSubmitting={isSubmitting}
                />
            ),
        },
    ];

    const activeStep = steps[activeStepIndex];


    const isFormComplete = guard && isSuccess;

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col items-center">
                {!isFormComplete && (
                    <h1 className="text-3xl text-center font-bold mb-6">Add New Guard</h1>
                )}

                <div className="w-[60%]">
                    {isFormComplete ? (
                        <Success
                            name={`${guard.firstName} ${guard.lastName}`}
                            onSkip={() => router.push('/guards')}
                            onRate={() => router.push(`/guards/${guard.uuid}/add-rating`)}
                        />
                    ) : (
                        <>
                            <Stepper
                                steps={steps}
                                currentStep={activeStepIndex}
                                variant="default"
                                className="my-4"
                            />
                            <div className="min-h-[150px]">{activeStep.content}</div>
                        </>
                    )}
                </div>
            </div>

            {!isFormComplete && (
                <footer className="mt-8 text-center text-gray-600">
                    <p>Notes: This information will be reviewed by the admin.</p>
                </footer>
            )}
        </div>
    );

}
