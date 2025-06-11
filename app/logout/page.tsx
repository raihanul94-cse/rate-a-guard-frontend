'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { removeJwtAccessToken, removeJwtRefreshToken } from '@/lib/cookie'

export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        const logout = async () => {
            removeJwtAccessToken();
            removeJwtRefreshToken();
            router.push('/login');
        }

        logout()
    }, [router])

    return <p>Logging out...</p>
}
