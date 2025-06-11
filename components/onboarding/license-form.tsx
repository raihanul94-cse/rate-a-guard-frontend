'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { GUARD_LICENSE_TYPE } from '@/lib/enums';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const minDate = new Date();

const licenseFormSchema = z
    .object({
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
    })
    .refine(
        (data) => {
            const expiration = new Date(data.licenseExpirationDate);
            if (expiration < minDate) return false;
            return true;
        },
        {
            message: 'Expiration date must be future date.',
            path: ['licenseExpirationDate'],
        }
    );

type LicenseFormValues = z.infer<typeof licenseFormSchema>;

interface IProps {
    handleNextStep(stepValues: Record<string, unknown>): void;
    handleBackStep(stepValues: Record<string, unknown>): void;
    defaultValues: Record<string, unknown>;
}

export function LicenseForm({ handleNextStep, handleBackStep, defaultValues }: IProps) {
    const form = useForm<LicenseFormValues>({
        resolver: zodResolver(licenseFormSchema),
        defaultValues: {
            companyName: '',
            licenseNumber: '',
            licenseType: '',
            licenseExpirationDate: '',
        },
    });

    const { control, reset, getValues, handleSubmit } = form;

    async function onSubmit(values: z.infer<typeof licenseFormSchema>) {
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
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {GUARD_LICENSE_TYPE.map((licenseType) => (
                                                    <SelectItem
                                                        key={licenseType.abbreviation}
                                                        value={licenseType.abbreviation}
                                                    >
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
                                    <FormLabel>Expiration Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </fieldset>
                <div className="flex align-center space-x-4">
                    <Button className="w-full" variant={'outline'} onClick={handleBack} disabled={true}>
                        Back
                    </Button>

                    <Button className="w-full" type="submit">
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    );
}
