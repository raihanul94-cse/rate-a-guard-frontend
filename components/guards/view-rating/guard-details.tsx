import { Card } from "@/components/ui/card";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export function GuardDetails() {
    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold">Company details</h3>
                    <div className="mt-4 space-y-4">
                        <p className="text-sm text-muted-foreground">
                            At NxtGen Security, we provide comprehensive security solutions that
                            encompass elite on-site guarding, advanced video surveillance, and
                            robust cybersecurity services across Massachusetts.
                        </p>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Contact info</h3>
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                                10 Rogers St Suite 101, 02142, Cambridge, United States
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a
                                href="tel:(508) 314-3937"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                (508) 314-3937
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a
                                href="mailto:contact@nxtgsecurity.com"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                contact@nxtgsecurity.com
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a
                                href="https://nxtgsecurity.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                nxtgsecurity.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}