import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axiosHelper from './lib/axios-helper';
import { TResponse } from './types/response';
import { IActivationStatus } from './types/user';
import { ApiError } from './lib/api-error';

export const config = {
    matcher: ['/dashboard', '/settings/:path*', '/guards/:path*', '/search-license', '/search-results'],
};

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('access-token')?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const response = await axiosHelper.get<TResponse<IActivationStatus>>('/api/user/activation-status');
        if (response.status === 'success') {
            const data = response.data;

            if (data.company.status === 'pending') {
                return NextResponse.redirect(new URL('/activation-status', req.url));
            } else if (data.company.status === 'onboarding') {
                return NextResponse.redirect(new URL('/onboarding', req.url));
            }
        }

        return NextResponse.next();
    } catch (error: unknown) {
        if (error instanceof ApiError) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
}
