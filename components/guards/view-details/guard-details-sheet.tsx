import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Briefcase, Home, Phone, Info, IdCard, History } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { IGuardTable } from '@/types/guard';
import { GuardWorkHistory } from '@/components/guards/view-details/guard-work-history';
import { GuardLicenses } from '@/components/guards/view-details/guard-licenses';

export function GuardDetailsSheet({
    open,
    onOpenChange,
    guard,
}: {
    open: boolean;
    onOpenChange(open: boolean): void;
    guard: IGuardTable;
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[800px]" size="3xl">
                <SheetHeader>
                    <div className="flex items-start gap-4 flex-1 px-6 pt-4">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback>
                                {guard.firstName[0]}
                                {guard.lastName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <SheetTitle className="text-xl font-semibold">
                                    {guard.firstName} {guard.lastName}
                                </SheetTitle>
                                <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-1"
                                >
                                    <Info className="mr-1 h-3 w-3" />
                                    Claimed profile
                                </Badge>
                            </div>
                            <SheetDescription className="text-gray-600 text-sm mb-3">
                                {guard.emailAddress}
                            </SheetDescription>
                        </div>
                    </div>
                </SheetHeader>

                <div className="flex justify-center mx-auto px-5">
                    <div className="grid grid-cols-4 gap-6 text-sm mt-3 max-w-3xl">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600 text-xs">Position</span>
                            <span className="font-medium">Company Principal</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <Home className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600 text-xs">Department</span>
                            <span className="font-medium">State Security Force</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <MapPin className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600 text-xs">Location</span>
                            <span className="font-medium">
                                {guard.city}, {guard.state}
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-center">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <span className="text-gray-600 text-xs">Phone Number</span>
                            <span className="font-medium">{guard.phoneNumber}</span>
                        </div>
                    </div>
                </div>

                <div className="px-5 pt-3">
                    <Separator />
                </div>

                <div className="px-6 py-6">
                    <Tabs defaultValue="stage" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="licenses" className="flex items-center gap-2">
                                <IdCard className="h-4 w-4" />
                                Licenses
                            </TabsTrigger>
                            <TabsTrigger value="work-history" className="flex items-center gap-2">
                                <History className="h-4 w-4" />
                                Work History
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="licenses" className="mt-0">
                            <GuardLicenses guard={guard} />
                        </TabsContent>

                        <TabsContent value="work-history" className="mt-0">
                            <GuardWorkHistory guard={guard} />
                        </TabsContent>
                    </Tabs>
                </div>
            </SheetContent>
        </Sheet>
    );
}
