'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { setJwtToken } from '@/lib/cookie';
import { genericClient } from '@/lib/generic-api-helper';
import Link from 'next/link';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';

const formSchema = z.object({
    emailAddress: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export function LoginForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                url: '/api/auth/login',
                method: 'post',
                data: values,
            });

            if (response.status === 'success') {
                setJwtToken(response.data.authTokens);

                if (response.data.company.status === 'pending') {
                    router.push('/activation-status');
                } else if (response.data.company.status === 'onboarding') {
                    router.push('/onboarding');
                } else {
                    router.push('/dashboard');
                }
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
                <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                <p className="text-sm text-muted-foreground">Enter your credentials to login in to your account</p>
            </div>
            <div className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="emailAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="username@example.com"
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" disabled={isSubmitting} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-between">
                            <div></div>
                            <Link href="/forgot-password" className="text-xs font-medium">
                                Forgot password?
                            </Link>
                        </div>
                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login in with Email'}
                        </Button>
                    </form>
                </Form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="font-medium">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
