'use client';

import { Button } from '@/components/ui/button';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { useToast } from '@/hooks/use-toast';
import { ApiError } from '@/lib/api-error';
import { genericClient } from '@/lib/generic-api-helper';
import { IErrorResponse } from '@/types/response';
import { Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

export function GuardReviewUnlock() {
    const { toast } = useToast();
    const router = useRouter();
    const { openDialog, Dialog } = useConfirmDialog();
    const { guardUuid } = useParams<{ guardUuid: string }>();

    async function handleUnlockGuardReviews() {
        try {
            const resp = await genericClient({
                url: `/api/guards/${guardUuid}/enable-review-access`,
                method: 'post',
            });

            if (resp.status === 'success') {
                router.refresh();
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: "Guard's reviews unlocked successfully.",
                });
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
    }

    return (
        <div className="p-8 max-w-2xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Unlock all latest ratings with just one click</h2>
            <div className="space-y-2 mb-8">
                <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-gray-700 text-sm">Access all latest ratings on RAG</span>
                </div>
                <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-gray-700 text-sm">
                        Read everything on RAG, including previous job histories
                    </span>
                </div>
            </div>

            <Button
                onClick={() =>
                    openDialog(() => handleUnlockGuardReviews(), {
                        title: 'Are you absolutely sure?',
                        description: "Unlocking this guard's reviews will deduct 1 token from your account.",
                        confirmText: 'Confirm',
                        cancelText: 'Cancel',
                    })
                }
            >
                Unlock All Ratings
            </Button>

            {Dialog}
        </div>
    );
}
