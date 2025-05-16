export interface IAuthToken {
    token: string;
    expires: number;
}

export interface IAuthTokens {
    access: IAuthToken;
    refresh: IAuthToken;
}

export interface IUser {
    uuid: string;
    emailAddress: string;
    role: string;
    status: string;
}

export interface ICompany {
    uuid: string;
    companyName: string;
    registeredAgentFirstName: string;
    registeredAgentLastName: string;
}

export interface ILoginResponseData {
    user: IUser;
    company: ICompany;
    authTokens: IAuthTokens;
}
