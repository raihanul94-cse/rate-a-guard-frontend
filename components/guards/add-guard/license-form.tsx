import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GUARD_LICENSE_TYPE, US_STATES } from '@/lib/enums';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const formSchema = z.object({
    licenseNumber: z.string().min(1, { message: 'Please enter the license number.' }),

    licenseType: z.string().min(1, { message: 'Please specify the license type.' }),

    licenseIssuanceState: z.string().min(1, { message: 'Please select the state where the license was issued.' }),

    licenseIssuanceDate: z
        .string({ required_error: 'Please select the issuance date.' })
        .regex(dateRegex, { message: 'Issuance date must be in YYYY-MM-DD format.' }),

    licenseExpirationDate: z
        .string({ required_error: 'Please select the expiration date.' })
        .regex(dateRegex, { message: 'Expiration date must be in YYYY-MM-DD format.' }),
});

interface IProps {
    handleNextStep(stepValues: Record<string, unknown>): void;
    handleBackStep(stepValues: Record<string, unknown>): void;
    defaultValues: Record<string, unknown>;
    isSubmitting: boolean;
}

export function LicenseForm({ handleNextStep, handleBackStep, defaultValues, isSubmitting }: IProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            licenseNumber: '',
            licenseType: '',
            licenseIssuanceState: '',
            licenseIssuanceDate: '',
            licenseExpirationDate: '',
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
                            name="licenseNumber"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                    <FormLabel>License Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Valid license number" />
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
                            name="licenseIssuanceState"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Issuance State</FormLabel>
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
                            name="licenseIssuanceDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Issuance Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
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
                    <Button className="w-full" variant={'outline'} onClick={handleBack}>
                        Back
                    </Button>

                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
