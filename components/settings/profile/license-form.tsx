'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ILicenseForm } from '@/types/user';
import { genericClient } from '@/lib/generic-api-helper';

const licenseFormSchema = z.object({
    companyName: z
        .string()
        .min(2, { message: 'Company name must be at least 2 characters.' })
        .max(30, { message: 'Company name must not be longer than 30 characters.' }),
    licenseNumber: z
        .string()
        .min(2, { message: 'License number must be at least 2 characters.' })
        .max(30, { message: 'License number must not be longer than 30 characters.' }),
    licenseType: z
        .string()
        .min(2, { message: 'License type must be at least 2 characters.' })
        .max(30, { message: 'License type must not be longer than 30 characters.' }),
    licenseExpirationDate: z
        .string({
            required_error: 'Please select a date.',
        })
});

type LicenseFormValues = z.infer<typeof licenseFormSchema>;

interface IProps {
    data: ILicenseForm
}

export function LicenseForm({ data }: IProps) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<LicenseFormValues>({
        resolver: zodResolver(licenseFormSchema),
        defaultValues: {
            companyName: '',
            licenseNumber: '',
            licenseType: '',
            licenseExpirationDate: ''
        },
    });

    async function onSubmit(values: LicenseFormValues) {
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
                data.companyName = response.data.companyName;
                data.licenseNumber = response.data.licenseNumber;
                data.licenseType = response.data.licenseType;
                data.licenseExpirationDate = response.data.licenseExpirationDate;
                form.reset({
                    companyName: response.data.companyName,
                    licenseNumber: response.data.licenseNumber,
                    licenseType: response.data.licenseType,
                    licenseExpirationDate: response.data.licenseExpirationDate,
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
                companyName: data.companyName,
                licenseNumber: data.licenseNumber,
                licenseType: data.licenseType,
                licenseExpirationDate: data.licenseExpirationDate,
            });
        }
    }, [data, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input placeholder="XYZ Securities" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>License Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Valid license number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="licenseType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>License Type</FormLabel>
                            <FormControl>
                                <Input placeholder="Company license type" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="licenseExpirationDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>License Type</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
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
