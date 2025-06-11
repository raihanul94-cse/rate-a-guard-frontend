import { useEffect, useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { IGuardTable } from '@/types/guard';
import { genericClient } from '@/lib/generic-api-helper';
import { useToast } from '@/hooks/use-toast';
import { sanitizeFormData } from '@/lib/utils';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';
import { US_STATES } from '@/lib/enums';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const zipRegex = /^\d{4,10}$/;
const minDate = new Date('1900-01-01');

const formSchema = z
    .object({
        firstName: z.string().min(1, 'Please enter your first name.'),
        lastName: z.string().min(1, 'Please enter your last name.'),
        emailAddress: z.string().email('That doesn’t look like a valid email. Please double-check.'),
        phoneNumber: z.string().min(1, 'Please provide your phone number.'),
        joiningDate: z
            .string({
                required_error: 'Please select the joining date.',
            })
            .regex(dateRegex, 'Please select a valid joining date.'),
        resignationDate: z
            .string()
            .optional()
            .refine((val) => !val || dateRegex.test(val), 'Please select a valid resignation date.'),
        address: z.string().min(1, { message: 'Please enter your street address.' }),

        city: z.string().min(1, { message: 'City is required.' }),

        state: z.string().min(1, { message: 'Please specify the state or region.' }),

        country: z.string().min(1, { message: 'Please select a country.' }),

        zip: z
            .string()
            .min(1, { message: 'ZIP or postal code is required.' })
            .regex(zipRegex, { message: 'Please enter a valid ZIP/postal code.' }),
    })
    .refine(
        (data) => {
            const joining = new Date(data.joiningDate);
            if (joining < minDate) return false;
            if (data.resignationDate) {
                const resignation = new Date(data.resignationDate);
                if (resignation < minDate) return false;
                if (resignation <= joining) return false;
            }
            return true;
        },
        {
            message: 'Resignation date must be after joining date and both dates must be after the year 1900.',
            path: ['resignationDate'],
        }
    );

export function GuardEditSheet({
    open,
    onOpenChange,
    guard,
    reload,
}: {
    open: boolean;
    onOpenChange(open: boolean): void;
    guard: IGuardTable;
    reload(): void;
}) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            joiningDate: '',
            resignationDate: '',
            address: '',
            city: '',
            country: '',
            zip: '',
            state: '',
        },
    });

    const { control, reset, handleSubmit } = form;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            const response = await genericClient({
                url: `/api/user/guards/${guard.uuid}`,
                method: 'put',
                data: { ...values },
            });

            if (response.status === 'success') {
                reload();
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: 'Guard updated successfully.',
                });
                reset();
                onOpenChange(false);
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

    useEffect(() => {
        if (guard) {
            reset(sanitizeFormData(guard) as z.infer<typeof formSchema>);
        }
    }, [guard, reset]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[800px]" size="3xl">
                <SheetHeader>
                    <SheetTitle className="text-xl font-semibold">Edit Details</SheetTitle>
                    <SheetDescription className="text-gray-600 text-sm mb-3"></SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <fieldset className="space-y-3">
                            <legend className="text-md font-semibold">Personal Info</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} value={field.value ?? ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="emailAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="joiningDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Joining Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="resignationDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Resignation Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </fieldset>

                        <fieldset className="space-y-3">
                            <legend className="text-md font-semibold">Address</legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="sm:col-span-2">
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                                <Input {...field} />
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
                                                            <SelectItem
                                                                key={state.abbreviation}
                                                                value={state.abbreviation}
                                                            >
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
                                    name="zip"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zip</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </fieldset>

                        <SheetFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
