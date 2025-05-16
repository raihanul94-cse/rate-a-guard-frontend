'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { IAddressForm } from '@/types/user';

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
    data: IAddressForm
}

export function AddressForm({ data }: IProps) {
    const { toast } = useToast();

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

    function onSubmit(data: AddressFormValues) {
        toast({
            title: 'Profile updated',
            description: 'Your profile has been updated successfully.',
        });
        console.log(data);
    }

    useEffect(() => {
        if (data) {
            form.reset({
                address: data.address,
                city: data.city,
                state: data.state,
                country: data.country,
                zip: data.zip
            });
        }
    }, [data, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
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
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
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
                    control={form.control}
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

                {
                    form.formState.isDirty &&
                    <Button type="submit">Save Changes</Button>
                }
            </form>
        </Form>
    );
}
