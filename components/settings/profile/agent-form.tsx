'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { IAgentForm } from '@/types/user';
import { useEffect, useState } from 'react';
import { genericClient } from '@/lib/generic-api-helper';

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
    data: IAgentForm
}

export function AgentForm({ data }: IProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AgentFormValues>({
        resolver: zodResolver(agentFormSchema),
        defaultValues: {
            registeredAgentFirstName: '',
            registeredAgentLastName: '',
            phoneNumber: '',
            emailAddress: '',
        },
    });

    async function onSubmit(values: AgentFormValues) {
        setIsLoading(true);

        try {
            const response = await genericClient({
                url: '/api/users/profile',
                method: 'put',
                data: values
            });

            if (response.status === 'success') {
                toast({
                    title: 'Profile updated',
                    description: 'Your profile has been updated successfully.',
                });
                data.registeredAgentFirstName = response.data.registeredAgentFirstName;
                data.registeredAgentLastName = response.data.registeredAgentLastName;
                data.emailAddress = response.data.emailAddress;
                data.phoneNumber = response.data.phoneNumber;
                form.reset({
                    registeredAgentFirstName: response.data.registeredAgentFirstName,
                    registeredAgentLastName: response.data.registeredAgentLastName,
                    emailAddress: response.data.emailAddress,
                    phoneNumber: response.data.phoneNumber,
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (data) {
            form.reset({
                registeredAgentFirstName: data.registeredAgentFirstName,
                registeredAgentLastName: data.registeredAgentLastName,
                emailAddress: data.emailAddress,
                phoneNumber: data.phoneNumber,
            });
        }
    }, [data, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                {
                    form.formState.isDirty &&
                    <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving Changes...' : 'Save Changes'}</Button>
                }
            </form>
        </Form>
    );
}
