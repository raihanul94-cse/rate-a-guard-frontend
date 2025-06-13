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
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COMPANY_LICENSE_TYPE } from '@/lib/enums';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const licenseFormSchema = z.object({
    companyName: z
        .string()
        .min(2, { message: 'Company name must be at least 2 characters long.' })
        .max(30, { message: 'Company name can’t be longer than 30 characters.' }),

    licenseNumber: z
        .string()
        .min(2, { message: 'License number must be at least 2 characters long.' })
        .max(30, { message: 'License number can’t be longer than 30 characters.' }),

    licenseType: z
        .string()
        .min(2, { message: 'License type must be at least 2 characters long.' })
        .max(30, { message: 'License type can’t be longer than 30 characters.' }),

    licenseExpirationDate: z
        .string({
            required_error: 'Please select the license expiration date.',
        })
        .regex(dateRegex, { message: 'Date must be in the format.' }),
});

type LicenseFormValues = z.infer<typeof licenseFormSchema>;

interface IProps {
    data: ILicenseForm;
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
            licenseExpirationDate: '',
        },
    });

    const { control, handleSubmit, reset, formState } = form;

    async function onSubmit(values: LicenseFormValues) {
        setIsLoading(true);

        try {
            const response = await genericClient({
                url: '/api/user/profile',
                method: 'put',
                data: values,
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
                reset({
                    companyName: response.data.companyName,
                    licenseNumber: response.data.licenseNumber,
                    licenseType: response.data.licenseType,
                    licenseExpirationDate: response.data.licenseExpirationDate,
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
            reset({
                companyName: data.companyName,
                licenseNumber: data.licenseNumber,
                licenseType: data.licenseType,
                licenseExpirationDate: data.licenseExpirationDate,
            });
        }
    }, [data, reset]);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                    control={control}
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
                    control={control}
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
                    control={control}
                    name="licenseType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>License Type</FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COMPANY_LICENSE_TYPE.map((licenseType) => (
                                            <SelectItem key={licenseType.abbreviation} value={licenseType.abbreviation}>
                                                {licenseType.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="licenseExpirationDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>License Expiration</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {formState.isDirty && (
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving Changes...' : 'Save Changes'}
                    </Button>
                )}
            </form>
        </Form>
    );
}
