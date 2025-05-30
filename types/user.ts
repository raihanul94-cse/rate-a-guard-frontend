export interface ICompany {
    uuid: string;
    companyName: string;
    registeredAgentFirstName: string;
    registeredAgentLastName: string;
    emailAddress: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    licenseNumber: string;
    licenseType: string;
    licenseExpirationDate: string;
}

export interface IUserWithCompanyResponse {
    uuid: string;
    emailAddress: string;
    role: 'default-user' | string;
    status: 'active' | 'inactive' | string;
    company: ICompany;
}

export interface ILicenseForm {
    companyName: string;
    licenseNumber: string;
    licenseType: string;
    licenseExpirationDate: string;
}

export interface IAddressForm {
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

export interface IAgentForm {
    registeredAgentFirstName: string;
    registeredAgentLastName: string;
    emailAddress: string;
    phoneNumber: string;
}

export interface IAccountForm {
    emailAddress: string;
}

export interface IChangePasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
