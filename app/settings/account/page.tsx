import { AccountForm } from '@/components/settings/account/account-form';
import { ChangePasswordForm } from '@/components/settings/account/change-password-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axiosHelper from '@/lib/axios-helper';
import { TResponse } from '@/types/response';
import { IUserWithCompanyResponse } from '@/types/user';

async function getSettingsData() {
    try {
        const response = await axiosHelper.get<TResponse<IUserWithCompanyResponse>>('/api/users/profile');
        if (response.status === 'success') {
            return response.data;
        }
    } catch (error) {
        console.error('Failed to fetch settings data:', error);
    }
    return null;
}

export default async function SettingsPage() {
    const response = await getSettingsData();

    if (!response) {
        return (
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-red-500">Failed to load settings. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">
                    Details related to user account, change email and password.
                </p>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
            <Tabs defaultValue="license" className="w-[100%]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="license">Account</TabsTrigger>
                    <TabsTrigger value="address">Change Password</TabsTrigger>
                </TabsList>
                <TabsContent value="license">
                    <AccountForm data={{
                        emailAddress: response.emailAddress
                    }} />
                </TabsContent>
                <TabsContent value="address">
                    <ChangePasswordForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
