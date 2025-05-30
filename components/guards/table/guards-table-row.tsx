import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { MoreVertical, Plus, Trash2 } from 'lucide-react';
import { IGuardLicense, IGuardTable } from '@/types/guard';

interface IProps {
    guard: IGuardTable;
}

export function GuardsTableRow({ guard }: IProps) {
    const [isAddingLicense, setIsAddingLicense] = useState(false);
    const [newLicense, setNewLicense] = useState<Partial<IGuardLicense>>({
        licenseType: '',
        licenseNumber: '',
        licenseIssuanceState: '',
        licenseIssuanceDate: '',
        licenseExpirationDate: '',
    });

    const handleAddLicense = (guardUuid: string) => {
        setIsAddingLicense(false);
        setNewLicense({
            licenseType: '',
            licenseNumber: '',
            licenseIssuanceState: '',
            licenseIssuanceDate: '',
            licenseExpirationDate: '',
        });
    };

    const handleDeleteLicense = (guardUuid: string, guardLicenseUuid: string) => {};
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
                        <div className="text-sm text-muted-foreground">
                            Joined {new Date(guard.joiningDate).toLocaleDateString()}
                        </div>
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
                                onClick={() => handleDeleteLicense(guard.uuid, license.uuid)}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}

                    <Dialog open={isAddingLicense} onOpenChange={setIsAddingLicense}>
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
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Input
                                        placeholder="License Type"
                                        value={newLicense.licenseType}
                                        onChange={(e) =>
                                            setNewLicense({
                                                ...newLicense,
                                                licenseType: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="License Number"
                                        value={newLicense.licenseNumber}
                                        onChange={(e) =>
                                            setNewLicense({
                                                ...newLicense,
                                                licenseNumber: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        placeholder="Issuance State"
                                        value={newLicense.licenseIssuanceState}
                                        onChange={(e) =>
                                            setNewLicense({
                                                ...newLicense,
                                                licenseIssuanceState: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        type="date"
                                        placeholder="Issuance Date"
                                        value={newLicense.licenseIssuanceDate}
                                        onChange={(e) =>
                                            setNewLicense({
                                                ...newLicense,
                                                licenseIssuanceDate: e.target.value,
                                            })
                                        }
                                    />
                                    <Input
                                        type="date"
                                        placeholder="Expiration Date"
                                        value={newLicense.licenseExpirationDate}
                                        onChange={(e) =>
                                            setNewLicense({
                                                ...newLicense,
                                                licenseExpirationDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={() => handleAddLicense(guard.uuid)}>Add License</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
                        <DropdownMenuItem onSelect={() => {}}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
}
