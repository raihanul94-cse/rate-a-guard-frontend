'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoForm } from '@/components/guards/add-guard/personal-info-form';
import { AddressForm } from '@/components/guards/add-guard/address-form';
import { LicenseForm } from '@/components/guards/add-guard/license-form';
import { useToast } from '@/hooks/use-toast';
import { genericClient } from '@/lib/generic-api-helper';
import { useRouter } from 'next/navigation';
import { Success } from '@/components/guards/add-guard/success';
import { IGuard } from '@/types/guard';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AddGuardForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [values, setValues] = useState<Record<string, unknown>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [guard, setGuard] = useState<IGuard | null>(null);
    const [currentStep, setCurrentStep] = useState('personal-info');

    function handleNextStep(stepValues: Record<string, unknown>, step: string) {
        setValues((prev) => ({ ...prev, ...stepValues }));
        setCurrentStep(step);
    }

    function handleBackStep(stepValues: Record<string, unknown>, step: string) {
        setValues((prev) => ({ ...prev, ...stepValues }));
        setCurrentStep(step);
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
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                const details = error.details as IErrorResponse;

                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: details.error.message,
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const isFormComplete = guard && isSuccess;

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col items-center">
                {!isFormComplete && <h1 className="text-3xl text-center font-bold mb-6">Register a Guard</h1>}

                <div className="w-[60%]">
                    {isFormComplete ? (
                        <Success
                            name={`${guard.firstName} ${guard.lastName}`}
                            onSkip={() => router.push('/guards')}
                            onRate={() => router.push(`/guards/${guard.uuid}/add-rating`)}
                        />
                    ) : (
                        <Card>
                            <CardHeader className="text-start">
                                <CardTitle className="text-xl">Guard Information</CardTitle>
                                <CardDescription className="text-sm">
                                    Please provide the guard&apos;s details. All information will be verified.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs value={currentStep} className="w-full">
                                    <TabsList className="grid w-full grid-cols-3 mb-8">
                                        <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                                        <TabsTrigger value="address">Address</TabsTrigger>
                                        <TabsTrigger value="license">License</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="personal-info">
                                        <PersonalInfoForm
                                            handleNextStep={(stepValues) => handleNextStep(stepValues, 'address')}
                                            handleBackStep={(stepValues) => handleBackStep(stepValues, 'personal-info')}
                                            defaultValues={values}
                                        />
                                    </TabsContent>
                                    <TabsContent value="address">
                                        <AddressForm
                                            handleNextStep={(stepValues) => handleNextStep(stepValues, 'license')}
                                            handleBackStep={(stepValues) => handleBackStep(stepValues, 'personal-info')}
                                            defaultValues={values}
                                        />
                                    </TabsContent>
                                    <TabsContent value="license">
                                        <LicenseForm
                                            handleNextStep={(stepValues) => handleSubmitGuardInfo(stepValues)}
                                            handleBackStep={(stepValues) => handleBackStep(stepValues, 'address')}
                                            defaultValues={values}
                                            isSubmitting={isSubmitting}
                                        />
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
