'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { IAccountForm } from '@/types/user';
import { useEffect } from 'react';

const accountFormSchema = z.object({
    emailAddress: z.string().email({ message: 'Please enter a valid email address.' }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

interface IProps {
    data: IAccountForm
}

export function AccountForm({ data }: IProps) {
    const { toast } = useToast();

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            emailAddress: '',
        },
    });

    function onSubmit(data: AccountFormValues) {
        toast({
            title: 'Profile updated',
            description: 'Your profile has been updated successfully.',
        });
        console.log(data);
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
                {
                    form.formState.isDirty &&
                    <Button type="submit">Save Changes</Button>
                }
            </form>
        </Form>
    );
}
