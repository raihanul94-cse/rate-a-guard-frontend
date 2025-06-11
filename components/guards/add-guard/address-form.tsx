import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { US_STATES } from '@/lib/enums';

const zipRegex = /^\d{4,10}$/;

const formSchema = z.object({
    address: z.string().min(1, { message: 'Please enter your street address.' }),

    city: z.string().min(1, { message: 'City is required.' }),

    state: z.string().min(1, { message: 'Please specify the state or region.' }),

    country: z.string().min(1, { message: 'Please select a country.' }),

    zip: z
        .string()
        .min(1, { message: 'ZIP or postal code is required.' })
        .regex(zipRegex, { message: 'Please enter a valid ZIP/postal code.' }),
});

interface IProps {
    handleNextStep(stepValues: Record<string, unknown>): void;
    handleBackStep(stepValues: Record<string, unknown>): void;
    defaultValues: Record<string, unknown>;
}

export function AddressForm({ handleNextStep, handleBackStep, defaultValues }: IProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: '',
            city: '',
            country: '',
            zip: '',
            state: '',
        },
    });

    const { control, reset, getValues, handleSubmit } = form;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        handleNextStep(values);
    }

    const handleBack = () => {
        const values = getValues();
        handleBackStep(values);
    };

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <fieldset className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="123 Main St" />
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
                                        <Input {...field} placeholder="City" />
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
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
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
                                        <Input {...field} placeholder="Country" />
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
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="ZIP" />
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
