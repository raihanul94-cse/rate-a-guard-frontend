'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const agentFormSchema = z.object({
    registeredAgentFirstName: z
        .string()
        .min(2, { message: 'First name must be at least 2 characters.' })
        .max(30, { message: 'First name must not be longer than 30 characters.' }),
    registeredAgentLastName: z
        .string()
        .min(2, { message: 'Last name must be at least 2 characters.' })
        .max(30, { message: 'Last name must not be longer than 30 characters.' }),
    phoneNumber: z.string().max(20, { message: 'Phone number must not be longer than 20 characters.' }).optional(),
    emailAddress: z.string().email({ message: 'Please enter a valid email address.' }),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

interface IProps {
    handleNextStep(stepValues: Record<string, unknown>): void;
    handleBackStep(stepValues: Record<string, unknown>): void;
    defaultValues: Record<string, unknown>;
    isSubmitting: boolean;
}

export function AgentForm({ handleNextStep, handleBackStep, defaultValues, isSubmitting }: IProps) {
    const form = useForm<AgentFormValues>({
        resolver: zodResolver(agentFormSchema),
        defaultValues: {
            registeredAgentFirstName: '',
            registeredAgentLastName: '',
            phoneNumber: '',
            emailAddress: '',
        },
    });

    const { control, reset, getValues, handleSubmit } = form;

    async function onSubmit(values: z.infer<typeof agentFormSchema>) {
        handleNextStep(values);
    }

    function handleBack() {
        const values = getValues();
        handleBackStep(values);
    }

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <fieldset className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name="registeredAgentFirstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="registeredAgentLastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="emailAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="you@example.com" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+1-555-123-4567" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </fieldset>

                <div className="flex align-center space-x-4">
                    <Button className="w-full" variant={'outline'} onClick={handleBack}>
                        Back
                    </Button>

                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
