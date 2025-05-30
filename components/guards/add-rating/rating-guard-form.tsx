'use client';

import { useState } from 'react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RatingOption, SegmentedRatingBar } from '@/components/ui/segmented-rating-bar';
import { Textarea } from '@/components/ui/textarea';
import { useParams, useRouter } from 'next/navigation';
import { genericClient } from '@/lib/generic-api-helper';
import { useToast } from '@/hooks/use-toast';
import { RatingRehirable } from './rating-rehirable-toggle';

const ratingCriteriaOptions: {
    section: string;
    field: z.infer<typeof formSchema> extends infer T ? keyof T : never;
    options: RatingOption[];
}[] = [
        {
            section: 'How consistent was attendance and punctuality?',
            field: 'regularityRating',
            options: [
                { value: 1, label: 'Frequently Late / Absent', color: 'bg-red-500' },
                { value: 2, label: 'Often Late', color: 'bg-orange-500' },
                { value: 3, label: 'Sometimes Late', color: 'bg-yellow-400' },
                { value: 4, label: 'Usually On Time', color: 'bg-green-400' },
                { value: 5, label: 'Always On Time', color: 'bg-green-700' },
            ],
        },
        {
            section: 'How professional was the individual in conduct and attitude?',
            field: 'professionalismRating',
            options: [
                { value: 1, label: 'Unprofessional Behavior', color: 'bg-red-500' },
                { value: 2, label: 'Needs Improvement', color: 'bg-orange-500' },
                { value: 3, label: 'Adequate Conduct', color: 'bg-yellow-400' },
                { value: 4, label: 'Professional', color: 'bg-green-400' },
                { value: 5, label: 'Highly Professional', color: 'bg-green-700' },
            ],
        },
        {
            section: 'How productive was the individual in completing tasks?',
            field: 'productivityRating',
            options: [
                { value: 1, label: 'Very Unproductive', color: 'bg-red-500' },
                { value: 2, label: 'Low Output', color: 'bg-orange-500' },
                { value: 3, label: 'Meets Expectations', color: 'bg-yellow-400' },
                { value: 4, label: 'Above Average', color: 'bg-green-400' },
                { value: 5, label: 'Exceptional Output', color: 'bg-green-700' },
            ],
        },
        {
            section: 'How effective was the individual in customer service?',
            field: 'customerServiceRating',
            options: [
                { value: 1, label: 'Rude / Unhelpful', color: 'bg-red-500' },
                { value: 2, label: 'Inconsistent', color: 'bg-orange-500' },
                { value: 3, label: 'Adequate Support', color: 'bg-yellow-400' },
                { value: 4, label: 'Friendly & Helpful', color: 'bg-green-400' },
                { value: 5, label: 'Outstanding Service', color: 'bg-green-700' },
            ],
        },
        {
            section: 'How clear and effective was communication?',
            field: 'communicationRating',
            options: [
                { value: 1, label: 'Poor Communicator', color: 'bg-red-500' },
                { value: 2, label: 'Often Unclear', color: 'bg-orange-500' },
                { value: 3, label: 'Clear Sometimes', color: 'bg-yellow-400' },
                { value: 4, label: 'Clear & Concise', color: 'bg-green-400' },
                { value: 5, label: 'Excellent Communication', color: 'bg-green-700' },
            ],
        },
    ];

const formSchema = z.object({
    regularityRating: z.number().nullable().refine(val => val !== null && val >= 1, {
        message: "Regularity rating is required",
    }),
    professionalismRating: z.number().nullable().refine(val => val !== null && val >= 1, {
        message: "Professionalism rating is required",
    }),
    productivityRating: z.number().nullable().refine(val => val !== null && val >= 1, {
        message: "Productivity rating is required",
    }),
    customerServiceRating: z.number().nullable().refine(val => val !== null && val >= 1, {
        message: "Customer service rating is required",
    }),
    communicationRating: z.number().nullable().refine(val => val !== null && val >= 1, {
        message: "Communication rating is required",
    }),
    rehirable: z.string().nullable(),
    review: z.string().min(1, { message: "Review is required" }),
});


export function RatingGuardForm() {
    const { guardUuid } = useParams<{ guardUuid: string }>();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            regularityRating: null,
            professionalismRating: null,
            productivityRating: null,
            customerServiceRating: null,
            communicationRating: null,
            rehirable: null,
            review: '',
        },
    });

    const { control, handleSubmit, formState: { isValid } } = form;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        try {
            const response = await genericClient({
                url: `/api/guard-ratings/${guardUuid}`,
                method: 'post',
                data: { ...values },
            });

            if (response.status === 'success') {
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: 'Guard rating added successfully.',
                });

                router.push(`/guards/${guardUuid}/add-rating?success`);
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-[890px]">
                <fieldset className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {ratingCriteriaOptions.map((item, i) => (
                            <Controller
                                key={i}
                                name={item.field}
                                control={control}
                                render={({ field }) => (
                                    <SegmentedRatingBar
                                        label={item.section}
                                        options={item.options}
                                        value={field.value === null ? null : Number(field.value)}
                                        onValueChange={(val) => field.onChange(val === null ? null : Number(val))}
                                    />
                                )}
                            />
                        ))}
                    </div>
                </fieldset>
                <Controller
                    name={'rehirable'}
                    control={control}
                    render={({ field }) => <RatingRehirable value={field.value} onChange={field.onChange} />}
                />
                <div className="mt-4 p-6 bg-white rounded-lg shadow-md space-y-6">
                    <div className="mt-6">
                        <label className="text-lg font-semibold text-gray-700">
                            Write a Review <span className="text-red-500">*</span>
                        </label>
                        <p className="text-sm text-gray-600 mt-1">
                            Discuss the guard’s professional conduct, including their attentiveness, communication
                            skills, and ability to perform duties effectively.
                        </p>
                    </div>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700">GUIDELINES</h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                                    <li>Your rating could be removed if you use profanity or derogatory terms.</li>
                                    <li>
                                        Do not claim that the guard shows bias or favoritism toward or against any
                                        individuals.
                                    </li>
                                    <li>Don’t forget to proof read!</li>
                                </ul>
                                <a href="#" className="text-blue-500 text-sm mt-2 inline-block">
                                    VIEW ALL GUIDELINES
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Controller
                            name={'review'}
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    placeholder="What do you want others to know about this guard?"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                    <p className="text-xs text-gray-500">
                        By clicking the “Submit Feedback button, I acknowledge that I have read and agreed to the{' '}
                        <a href="#" className="text-blue-500">
                            Rate A Guard Site Guidelines, Terms of Use
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-500">
                            Privacy Policy
                        </a>
                        . Submitted data becomes the property of Rate A Guard.
                    </p>
                    <div className="mt-4 flex align-center justify-center space-x-2">
                        <Button type="submit" disabled={isSubmitting || !isValid}>
                            {isSubmitting ? 'Submitting Feedback...' : 'Submit Feedback'}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
