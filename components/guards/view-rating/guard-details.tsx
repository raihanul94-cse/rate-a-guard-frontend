import { Card } from '@/components/ui/card';
import { IGuardDetails } from '@/types/guard';
import { Building2, Globe, Mail, MapPin, Phone } from 'lucide-react';

export function GuardDetails({ guardDetailsData }: { guardDetailsData: IGuardDetails | null }) {
    return (
        <Card className="p-6  h-fit">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold">Company Info</h3>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{guardDetailsData?.guard.company.companyName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                                {guardDetailsData?.guard.company.address}, {guardDetailsData?.guard.company.city},{' '}
                                {guardDetailsData?.guard.company.state} {guardDetailsData?.guard.company.zip},{' '}
                                {guardDetailsData?.guard.company.country}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{guardDetailsData?.guard.company.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{guardDetailsData?.guard.company.emailAddress}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a
                                href="https://nxtgsecurity.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm"
                            >
                                example.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
