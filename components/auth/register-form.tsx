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
import { Captcha } from '@/components/security/Captcha';

const formSchema = z.object({
    emailAddress: z.string().email('Please enter a valid email address'),
    token: z.string().min(8, 'Complete the captcha'),
});

export function RegisterForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailAddress: '',
            token: ''
        },
    });

    const { control, getValues, handleSubmit } = form;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            const response = await genericClient({
                url: '/api/auth/register',
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
                <h1 className="text-2xl font-semibold tracking-tight">
                    {
                        isSuccess ?
                            'Your account created successfully' :
                            'Create an account'
                    }
                </h1>
                <p className="text-sm text-muted-foreground">
                    {isSuccess
                        ? 'Check your email for verification instructions'
                        : 'Enter your email below to create your account'}
                </p>
            </div>
            <div className="grid gap-6">
                {isSuccess ? (
                    <div className="text-center space-y-4">
                        <p className="text-sm text-gray-600">
                            We&apos;ve sent a verification link to <strong>{getValues('emailAddress')}</strong>
                        </p>
                        <p className="text-sm text-gray-600">
                            Check your email and follow the instructions to verify your registration.
                        </p>
                    </div>
                ) : (
                    <>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={control}
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
                                <div className="flex items-center justify-start pt-4">
                                    <Captcha onVerify={(token: string) => { form.setValue('token', token) }} />
                                </div>
                                <Button className="w-full" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Registering...' : 'Register with Email'}
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
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
