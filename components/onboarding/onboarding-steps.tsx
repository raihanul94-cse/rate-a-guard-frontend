'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LicenseForm } from '@/components/onboarding/license-form';
import { AddressForm } from '@/components/onboarding/address-form';
import { AgentForm } from '@/components/onboarding/agent-form';
import { genericClient } from '@/lib/generic-api-helper';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';

export function OnboardingSteps() {
    const router = useRouter();
    const { toast } = useToast();
    const [values, setValues] = useState<Record<string, unknown>>({});
    const [currentStep, setCurrentStep] = useState('license');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleNextStep(stepValues: Record<string, unknown>, step: string) {
        setValues((prev) => ({ ...prev, ...stepValues }));
        setCurrentStep(step);
    }

    function handleBackStep(stepValues: Record<string, unknown>, step: string) {
        setValues((prev) => ({ ...prev, ...stepValues }));
        setCurrentStep(step);
    }

    async function handleSubmitCompanyInfo(stepValues: Record<string, unknown>) {
        setIsSubmitting(true);

        try {
            const response = await genericClient({
                url: '/api/user/onboarding',
                method: 'put',
                data: { ...values, ...stepValues },
            });

            if (response.status === 'success') {
                toast({
                    variant: 'default',
                    title: 'Success',
                    description:
                        'Company information added successfully. Submitted information will be verified by RAG',
                });
                setValues({});
                router.push('/activation-status');
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

    return (
        <Tabs value={currentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="license">License</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="agent">Agent</TabsTrigger>
            </TabsList>
            <TabsContent value="license">
                <LicenseForm
                    handleNextStep={(stepValues) => handleNextStep(stepValues, 'address')}
                    handleBackStep={(stepValues) => handleBackStep(stepValues, 'license')}
                    defaultValues={values}
                />
            </TabsContent>
            <TabsContent value="address">
                <AddressForm
                    handleNextStep={(stepValues) => handleNextStep(stepValues, 'agent')}
                    handleBackStep={(stepValues) => handleBackStep(stepValues, 'license')}
                    defaultValues={values}
                />
            </TabsContent>
            <TabsContent value="agent">
                <AgentForm
                    handleNextStep={(stepValues) => handleSubmitCompanyInfo(stepValues)}
                    handleBackStep={(stepValues) => handleBackStep(stepValues, 'address')}
                    defaultValues={values}
                    isSubmitting={isSubmitting}
                />
            </TabsContent>
        </Tabs>
    );
}
