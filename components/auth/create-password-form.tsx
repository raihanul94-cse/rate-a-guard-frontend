'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { genericClient } from '@/lib/generic-api-helper';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';

const formSchema = z.object({
    emailAddress: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    code: z.string(),
});

export function CreatePasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const code = searchParams.get('code') || '';
    const emailAddress = searchParams.get('emailAddress') || '';

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            const response = await genericClient({
                url: '/api/auth/create-password',
                method: 'put',
                data: values,
            });

            if (response.status === 'success') {
                router.push('/login');
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

    useEffect(() => {
        if (emailAddress && code) {
            form.reset({
                emailAddress: emailAddress,
                code: code,
            });
        }
    }, [code, emailAddress, form]);

    if (!emailAddress || !code) {
        return (
            <>
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Invalid Reset Link</h1>
                    <p className="text-sm text-muted-foreground">This password reset link is invalid or has expired</p>
                </div>
                <p className="text-sm text-center text-gray-600">
                    Please request a new password reset link to continue.
                </p>
                <div className="space-y-4">
                    <Link href="/forgot-password">
                        <Button className="w-full">Request New Reset Link</Button>
                    </Link>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link href="/login" className="font-medium">
                            Login here
                        </Link>
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Create New Password</h1>
                <p className="text-sm text-muted-foreground">Your new password must be at least 8 characters long</p>
            </div>
            <div className="grid gap-6">
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
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
            </div>
        </>
    );
}
