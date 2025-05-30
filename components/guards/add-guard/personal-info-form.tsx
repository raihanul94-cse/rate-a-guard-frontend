import { useEffect } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const formSchema = z.object({
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
});

interface IProps {
    handleNextStep(stepValues: Record<string, unknown>): void;
    handleBackStep(stepValues: Record<string, unknown>): void;
    defaultValues: Record<string, unknown>;
}

export function PersonalInfoForm({ handleNextStep, handleBackStep, defaultValues }: IProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
            joiningDate: '',
            resignationDate: '',
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
                    <legend className="text-xl font-semibold">Personal Info</legend>
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
                <div className="flex align-center space-x-2">
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
