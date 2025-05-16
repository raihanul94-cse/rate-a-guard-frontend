import Cookies from 'js-cookie';

export function getJwtAccessToken() {
    return Cookies.get('access-token') as string;
}

export function getJwtRefreshToken() {
    return Cookies.get('refresh-token') as string;
}

export function setJwtToken(authTokens: IAuthTokens, options = {}) {
    if (authTokens.access) {
        Cookies.set('access-token', authTokens.access.token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: 1 / 24,
            ...options,
        });
    }

    if (authTokens.refresh) {
        Cookies.set('refresh-token', authTokens.refresh.token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: 1 / 24,
            ...options,
        });
    }
}

export function removeJwtAccessToken() {
    Cookies.remove('access-token');
}

export function removeJwtRefreshToken() {
    Cookies.remove('refresh-token');
}
