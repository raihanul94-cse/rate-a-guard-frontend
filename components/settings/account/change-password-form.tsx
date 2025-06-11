'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { genericClient } from '@/lib/generic-api-helper';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';

const changePasswordFormSchema = z
    .object({
        currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
        newPassword: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

export function ChangePasswordForm() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    async function onSubmit(values: ChangePasswordFormValues) {
        setIsLoading(true);

        try {
            const response = await genericClient({
                url: '/api/user/change-password',
                method: 'put',
                data: values,
            });

            if (response.status === 'success') {
                toast({
                    title: 'Profile updated',
                    description: 'Your profile has been updated successfully.',
                });
                form.reset({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
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
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.formState.isDirty && (
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving Changes...' : 'Save Changes'}
                    </Button>
                )}
            </form>
        </Form>
    );
}
