export const dynamic = 'force-dynamic';

import { AddressForm } from '@/components/settings/profile/address-form';
import { AgentForm } from '@/components/settings/profile/agent-form';
import { LicenseForm } from '@/components/settings/profile/license-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axiosHelper from '@/lib/axios-helper';
import { TResponse } from '@/types/response';
import { IUserWithCompanyResponse } from '@/types/user';

async function getSettingsData() {
    try {
        const response = await axiosHelper.get<TResponse<IUserWithCompanyResponse>>('/api/user/profile');
        if (response.status === 'success') {
            return response.data;
        }
    } catch (error) {
        console.log('Failed to fetch settings data:', error);
    }
    return null;
}

export default async function SettingsPage() {
    const response = await getSettingsData();

    if (!response) {
        return (
            <div>
                <h3 className="text-lg font-medium">Company Information</h3>
                <p className="text-sm text-red-500">Failed to load settings. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Company Information</h3>
                <p className="text-sm text-muted-foreground">
                    Details related to company licensing, registered address, and authorized agents.
                </p>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
            <Tabs defaultValue="license" className="w-[100%]">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="license">License</TabsTrigger>
                    <TabsTrigger value="address">Address</TabsTrigger>
                    <TabsTrigger value="agent">Agent</TabsTrigger>
                </TabsList>
                <TabsContent value="license">
                    <LicenseForm
                        data={{
                            companyName: response.company.companyName,
                            licenseNumber: response.company.licenseNumber,
                            licenseType: response.company.licenseType,
                            licenseExpirationDate: response.company.licenseExpirationDate,
                        }}
                    />
                </TabsContent>
                <TabsContent value="address">
                    <AddressForm
                        data={{
                            address: response.company.address,
                            city: response.company.city,
                            state: response.company.state,
                            country: response.company.country,
                            zip: response.company.zip,
                        }}
                    />
                </TabsContent>
                <TabsContent value="agent">
                    <AgentForm
                        data={{
                            registeredAgentFirstName: response.company.registeredAgentFirstName,
                            registeredAgentLastName: response.company.registeredAgentLastName,
                            emailAddress: response.company.emailAddress,
                            phoneNumber: response.company.phoneNumber,
                        }}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
