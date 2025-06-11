'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { genericClient } from '@/lib/generic-api-helper';
import Link from 'next/link';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';

const formSchema = z.object({
    emailAddress: z.string().email('Please enter a valid email address'),
});

export function ForgotPasswordForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            const response = await genericClient({
                url: '/api/auth/reset-password',
                method: 'post',
                data: values,
            });

            if (response.status === 'success') {
                setIsSuccess(true);
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
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Reset Your Password</h1>
                <p className="text-sm text-muted-foreground">
                    {isSuccess ? 'Check your email for reset instructions' : "We'll email you a reset link"}
                </p>
            </div>
            <div className="grid gap-6">
                {isSuccess ? (
                    <div className="text-center space-y-4">
                        <p className="text-sm text-gray-600">
                            We&apos;ve sent a verification link to <strong>{form.getValues('emailAddress')}</strong>
                        </p>
                        <p className="text-sm text-gray-600">
                            Check your email and follow the instructions to verify your registration.
                        </p>
                        <Button onClick={() => setIsSuccess(false)} variant="outline" className="w-full">
                            Try Different Email
                        </Button>
                    </div>
                ) : (
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="emailAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="name@example.com"
                                                    type="email"
                                                    disabled={isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="w-full" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending Reset Link...' : 'Send Reset Link'}
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Remember your password?{' '}
                                <Link href="/login" className="font-medium">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
