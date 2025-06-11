'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { IAccountForm } from '@/types/user';
import { genericClient } from '@/lib/generic-api-helper';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';

const accountFormSchema = z.object({
    emailAddress: z.string().email({ message: 'Please enter a valid email address.' }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

interface IProps {
    data: IAccountForm;
}

export function AccountForm({ data }: IProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            emailAddress: '',
        },
    });

    async function onSubmit(values: AccountFormValues) {
        setIsLoading(true);

        try {
            const response = await genericClient({
                url: '/api/user/change-email-address',
                method: 'put',
                data: values,
            });

            if (response.status === 'success') {
                toast({
                    title: 'Profile updated',
                    description: 'Your profile has been updated successfully.',
                });
                data.emailAddress = response.data.emailAddress;
                form.reset({
                    emailAddress: response.data.emailAddress,
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

    useEffect(() => {
        if (data) {
            form.reset({
                emailAddress: data.emailAddress,
            });
        }
    }, [data, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
                {form.formState.isDirty && (
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving Changes...' : 'Save Changes'}
                    </Button>
                )}
            </form>
        </Form>
    );
}
