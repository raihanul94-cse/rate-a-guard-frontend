import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { MoreVertical, Trash2 } from 'lucide-react';
import { IGuardTable } from '@/types/guard';
import { useToast } from '@/hooks/use-toast';
import { genericClient } from '@/lib/generic-api-helper';
import { AddLicenseDialog } from '@/components/guards/license/add-license-dialog';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { GuardDetailsSheet } from '@/components/guards/view-details/guard-details-sheet';
import { useBoolean } from '@/hooks/use-boolean';
import { formatDate } from '@/lib/utils';
import { GuardEditSheet } from '@/components/guards/edit-guard/edit-guard-sheet';

interface IProps {
    guard: IGuardTable;
    reload(): void;
}

export function GuardsTableRow({ guard, reload }: IProps) {
    const { toast } = useToast();
    const { openDialog, Dialog } = useConfirmDialog();
    const viewDetailsSheetStates = useBoolean();
    const editDetailsSheetStates = useBoolean();

    async function handleDeleteLicense(guardUuid: string, guardLicenseUuid: string) {
        try {
            const response = await genericClient({
                url: `/api/user/guards/${guardUuid}/licenses/${guardLicenseUuid}/delete`,
                method: 'delete',
            });

            if (response.status === 'success') {
                reload();
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: 'Guard license deleted successfully.',
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong. Please try again.',
            });
        }
    }

    async function handleDeleteGuard(guardUuid: string) {
        try {
            const response = await genericClient({
                url: `/api/user/guards/${guardUuid}/delete`,
                method: 'delete',
            });

            if (response.status === 'success') {
                reload();
                toast({
                    variant: 'default',
                    title: 'Success',
                    description: 'Guard deleted successfully.',
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Something went wrong. Please try again.',
            });
        }
    }
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>
                            {guard.firstName[0]}
                            {guard.lastName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-medium">
                            {guard.firstName} {guard.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">Joined {formatDate(guard.joiningDate)}</div>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <div className="space-y-1">
                    <div className="text-sm">{guard.emailAddress}</div>
                    <div className="text-sm text-muted-foreground">{guard.phoneNumber}</div>
                </div>
            </TableCell>
            <TableCell>
                <div className="text-sm">
                    {guard.city}, {guard.state}
                </div>
                <div className="text-sm text-muted-foreground">{guard.country}</div>
            </TableCell>
            <TableCell>
                <Badge variant={guard.status === 'active' ? 'default' : 'secondary'}>{guard.status}</Badge>
            </TableCell>
            <TableCell>
                <div className="space-y-2">
                    {guard.guardLicenses.map((license) => (
                        <div key={license.uuid} className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                                {license.licenseType} - {license.licenseNumber}
                            </Badge>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                    openDialog(() => handleDeleteLicense(guard.uuid, license.uuid), {
                                        title: 'Are you absolutely sure?',
                                        description: 'This will permanently delete the license.',
                                        confirmText: 'Delete',
                                        cancelText: 'Cancel',
                                    })
                                }
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}

                    <AddLicenseDialog reload={reload} guardUuid={guard.uuid} />
                </div>
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => viewDetailsSheetStates.setTrue()}>
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => editDetailsSheetStates.setTrue()}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive"
                            onSelect={() =>
                                openDialog(() => handleDeleteGuard(guard.uuid), {
                                    title: 'Are you absolutely sure?',
                                    description: 'This will permanently delete the guard.',
                                    confirmText: 'Delete',
                                    cancelText: 'Cancel',
                                })
                            }
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>

            {Dialog}

            <GuardDetailsSheet
                open={viewDetailsSheetStates.value}
                onOpenChange={viewDetailsSheetStates.setValue}
                guard={guard}
            />

            <GuardEditSheet
                open={editDetailsSheetStates.value}
                onOpenChange={editDetailsSheetStates.setValue}
                guard={guard}
                reload={reload}
            />
        </TableRow>
    );
}
