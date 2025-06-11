import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { formatDate } from '@/lib/utils';
import { IGuardTable } from '@/types/guard';
import { IdCard } from 'lucide-react';

export function GuardLicenses({ guard }: { guard: IGuardTable }) {
    return (
        <ScrollArea className="h-[550px] w-full overflow-hidden">
            <div className="space-y-4 overflow-y-auto">
                {guard.guardLicenses.map((guardLicense, index) => (
                    <Card className="p-6" key={index}>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    <span className="flex items-center gap-4">
                                        <IdCard className="h-5 w-5 text-gray-600" />
                                        {guardLicense.licenseNumber}
                                    </span>
                                </h3>
                            </div>
                        </div>

                        <hr className="my-4 border-gray-200" />
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                                <p className="font-medium mb-1">License Type</p>
                                <p className="text-gray-900 font-semibold text-xs">{guardLicense.licenseType}</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Issuance State</p>
                                <p className="text-gray-900 font-semibold text-xs">
                                    {guardLicense.licenseIssuanceState}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Issuance Date</p>
                                <p className="text-gray-900 font-semibold text-xs">
                                    {formatDate(guardLicense.licenseIssuanceDate)}
                                </p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Expiration Date</p>
                                <p className="text-gray-900 font-semibold text-xs">
                                    {formatDate(guardLicense.licenseExpirationDate)}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <ScrollBar
                orientation="vertical"
                className="flex select-none touch-none p-0.5 bg-gray-100 transition-colors duration-[160ms] ease-out hover:bg-gray-200"
            />
        </ScrollArea>
    );
}
