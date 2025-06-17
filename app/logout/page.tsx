'use client';

import { useEffect } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { removeJwtAccessToken, removeJwtRefreshToken } from '@/lib/cookie';
import { Spinner } from '@/components/ui/spinner';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            removeJwtAccessToken();
            removeJwtRefreshToken();
            router.push('/');
        };

        logout();
    }, [router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <Spinner />
                <p className="text-gray-600 text-lg font-medium">Logging out</p>
            </div>
        </div>
    );
}
