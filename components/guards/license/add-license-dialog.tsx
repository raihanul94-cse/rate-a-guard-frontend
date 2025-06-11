import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { genericClient } from '@/lib/generic-api-helper';
import { useBoolean } from '@/hooks/use-boolean';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';
import { GUARD_LICENSE_TYPE, US_STATES } from '@/lib/enums';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const minDate = new Date('1900-01-01');

const formSchema = z
    .object({
        licenseNumber: z.string().min(1, { message: 'Please enter the license number.' }),
        licenseType: z.string().min(1, { message: 'Please specify the license type.' }),
        licenseIssuanceState: z.string().min(1, { message: 'Please select the state where the license was issued.' }),
        licenseIssuanceDate: z
            .string({ required_error: 'Please select the issuance date.' })
            .regex(dateRegex, { message: 'Issuance date must be in YYYY-MM-DD format.' }),
        licenseExpirationDate: z
            .string({ required_error: 'Please select the expiration date.' })
            .regex(dateRegex, { message: 'Expiration date must be in YYYY-MM-DD format.' }),
    })
    .refine(
        (data) => {
            const issuance = new Date(data.licenseIssuanceDate);
            if (issuance < minDate) return false;
            if (data.licenseExpirationDate) {
                const expiration = new Date(data.licenseExpirationDate);
                if (expiration < minDate) return false;
                if (expiration <= issuance) return false;
            }
            return true;
        },
        {
            message: 'Expiration date must be after joining date and both dates must be after the year 1900.',
            path: ['licenseExpirationDate'],
        }
    );

type LicenseFormSchema = z.infer<typeof formSchema>;

export function AddLicenseDialog({ reload, guardUuid }: { reload(): void; guardUuid: string }) {
    const { toast } = useToast();
    const addLicenseModalState = useBoolean(false);

    const form = useForm<LicenseFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            licenseNumber: '',
            licenseType: '',
            licenseIssuanceState: '',
            licenseIssuanceDate: '',
            licenseExpirationDate: '',
        },
    });

    const onSubmit = async (values: LicenseFormSchema) => {
        try {
            const response = await genericClient({
                url: `/api/user/guards/${guardUuid}/licenses/create`,
                method: 'post',
                data: values,
            });

            if (response.status === 'success') {
                reload();
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: 'Guard license added successfully.',
                });
                addLicenseModalState.setFalse();
                form.reset();
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
        }
    };

    return (
        <Dialog open={addLicenseModalState.value} onOpenChange={addLicenseModalState.setValue}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add License
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New License</DialogTitle>
                    <DialogDescription>Enter the details for the new license.</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="licenseNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>License Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="License Number" />
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
                            control={form.control}
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
                            control={form.control}
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
                            control={form.control}
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

                        <DialogFooter className="pt-4">
                            <Button type="submit">Add License</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
