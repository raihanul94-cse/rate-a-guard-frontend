interface IAuthTokens {
    access: {
        token: string;
        expires: number;
    };
    refresh: {
        token: string;
        expires: number;
    };
}

interface IGuard {
    id: number;
    firstName: string;
    lastName: string;
    licenseNumber: string;
    state: string;
    company?: {
        companyName: string;
    };
}

interface ICompany {
    id: number;
    companyName: string;
    licenseNumber: string;
    state: string;
}
