'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { US_STATES } from '@/lib/enums';

const addressFormSchema = z.object({
    address: z
        .string()
        .min(2, { message: 'Address must be at least 2 characters.' })
        .max(100, { message: 'Address must not be longer than 100 characters.' }),
    city: z
        .string()
        .min(2, { message: 'City must be at least 2 characters.' })
        .max(50, { message: 'City must not be longer than 50 characters.' }),
    state: z.string().max(50, { message: 'State must not be longer than 50 characters.' }).optional(),
    country: z.string().max(50, { message: 'Country must not be longer than 50 characters.' }).optional(),
    zip: z.string().max(20, { message: 'ZIP code must not be longer than 20 characters.' }).optional(),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

interface IProps {
    handleNextStep(stepValues: Record<string, unknown>): void;
    handleBackStep(stepValues: Record<string, unknown>): void;
    defaultValues: Record<string, unknown>;
}

export function AddressForm({ handleNextStep, handleBackStep, defaultValues }: IProps) {
    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressFormSchema),
        defaultValues: {
            address: '',
            city: '',
            state: '',
            country: '',
            zip: '',
        },
    });

    const { control, reset, getValues, handleSubmit } = form;

    async function onSubmit(values: z.infer<typeof addressFormSchema>) {
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
                            name="address"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Main St" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {US_STATES.map((state) => (
                                                    <SelectItem key={state.abbreviation} value={state.abbreviation}>
                                                        {state.name}
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
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Country" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="zip"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ZIP Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ZIP" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </fieldset>
                <div className="flex align-center space-x-4">
                    <Button className="w-full" variant={'outline'} onClick={handleBack}>
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
