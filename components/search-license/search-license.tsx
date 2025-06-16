'use client';

import { useState } from 'react';
import { Search, Building2, Star } from 'lucide-react';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { genericClient } from '@/lib/generic-api-helper';
import { useToast } from '@/hooks/use-toast';
import { ApiError } from '@/lib/api-error';
import { IErrorResponse } from '@/types/response';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IGuardLicenseSearchResult, IOtherCompanyGuard } from '@/types/guard';
import { formatDate } from '@/lib/utils';
import { US_STATES } from '@/lib/enums';

const formSchema = z.object({
    state: z.string(),
    licenseNumber: z.string().min(1, { message: 'License Number is required' }),
});

export function SearchLicense() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            state: '',
            licenseNumber: '',
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchResult, setSearchResult] = useState<IGuardLicenseSearchResult | null>(null);

    const { control, handleSubmit } = form;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            const response = await genericClient({
                url: `/api/search/guards/`,
                method: 'get',
                params: { ...values },
            });

            if (response.status === 'success' && response.data) {
                setSearchResult(response.data);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'No guard found with this state and license number.',
                });
                setSearchResult(null);
            }
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                const details = error.details as IErrorResponse;

                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: details.error.message,
                });
                setSearchResult(null);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    function renderStars(rating: number) {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative w-4 h-4">
                        <Star className="w-4 h-4 text-gray-300 absolute" />
                        <div className="overflow-hidden w-1/2">
                            <Star className="w-4 h-4 fill-green-500 text-green-500" />
                        </div>
                    </div>
                );
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
            }
        }
        return (
            <div className="flex items-center">
                {stars}
                <span className="ml-1 text-sm text-gray-600">({rating})</span>
            </div>
        );
    }

    return (
        <div>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Search className="h-5 w-5" />
                        <span>License Search</span>
                    </CardTitle>
                    <CardDescription>Enter the guard&apos;s state and license number to search</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                            method="get"
                            action="/search-results"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    name="licenseNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>License Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter license number" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex justify-center pt-5">
                                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                                    <Search className="h-4 w-4 mr-2" />
                                    {isSubmitting ? 'Searching License...' : 'Search License'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {searchResult && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Guard Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Name</p>
                                    <p className="text-gray-900 font-semibold">
                                        {searchResult.guard.firstName} {searchResult.guard.lastName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">License Number</p>
                                    <p className="text-gray-900">{searchResult.guardLicense.licenseNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">License Type</p>
                                    <p className="text-gray-900">{searchResult.guardLicense.licenseType}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        {searchResult.guardLicense.status}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Expiration Date</p>
                                    <p className="text-gray-900">
                                        {formatDate(searchResult.guardLicense.licenseExpirationDate)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Overall Rating (All Companies)</p>
                                    {renderStars(1)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Building2 className="h-5 w-5" />
                                <span>Work History & Ratings</span>
                            </CardTitle>
                            <CardDescription>
                                Performance records across different security companies (
                                {searchResult.otherCompanyGuards.length} companies)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Company</TableHead>
                                            <TableHead>Working Period</TableHead>
                                            <TableHead>Overall Rating</TableHead>
                                            <TableHead>Reviews</TableHead>
                                            <TableHead>Would Rehire</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {searchResult.otherCompanyGuards.map(
                                            (otherCompanyGuard: IOtherCompanyGuard) => (
                                                <TableRow key={otherCompanyGuard.uuid}>
                                                    <TableCell className="font-medium">
                                                        {otherCompanyGuard.company.companyName}
                                                    </TableCell>
                                                    <TableCell>
                                                        <p className="text-xs text-gray-600 mt-0.5">
                                                            {formatDate(
                                                                otherCompanyGuard.joiningDate as string,
                                                                'yyyy'
                                                            )}{' '}
                                                            -{' '}
                                                            {formatDate(
                                                                otherCompanyGuard.resignationDate as string,
                                                                'yyyy'
                                                            ) || 'Present'}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        {renderStars(otherCompanyGuard.averageRating)}
                                                    </TableCell>
                                                    <TableCell>{otherCompanyGuard.guardRatingCount} reviews</TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary">
                                                            {otherCompanyGuard.guardRatingRehirablePercentage}%
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link
                                                            href={`/guards/${otherCompanyGuard.uuid}/view-ratings`}
                                                            target="_blank"
                                                        >
                                                            <Button variant="outline" size="sm">
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
