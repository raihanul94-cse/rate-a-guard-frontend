import { ICompany } from './user';

export interface IGuard {
    uuid: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    resignationDate: string | null;
    joiningDate: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    status: string;
}

export interface IGuardLicense {
    uuid: string;
    licenseNumber: string;
    licenseType: string;
    licenseIssuanceState: string;
    licenseIssuanceDate: string;
    licenseExpirationDate: string;
    status: string;
}

export interface IGuardTable extends IGuard {
    guardLicenses: IGuardLicense[];
}

export interface IGuardWithCompany extends Partial<IGuard> {
    company: Partial<ICompany>;
}

export interface IGuardMeta {
    guard: IGuardWithCompany;
    overallRatings: number;
    guardRatingCount: number;
}

export interface IGuardRatingStats {
    avgRegularityRating: string;
    avgProfessionalismRating: string;
    avgProductivityRating: string;
    avgCustomerServiceRating: string;
    avgCommunicationRating: string;
}

export interface IStarCounts {
    [key: string]: number;
}

export interface IGuardRating {
    uuid: string;
    regularityRating: number;
    professionalismRating: number;
    productivityRating: number;
    customerServiceRating: number;
    communicationRating: number;
    averageRating: string;
    rehirable: string;
    review: string;
    status: string;
}

export interface IGuardDetails extends IGuardMeta {
    ratings: IGuardRatingStats;
    ratingCount: number;
    starCounts: IStarCounts;
    guardLatestRating: IGuardRating;
    hasGuardReviewAccess: boolean;
}

export interface IGuardLicenseSearchResult {
    guard: IGuardWithCompany;
    otherCompanyGuards: IOtherCompanyGuard[];
    guardLicense: IGuardLicense;
}

export interface IOtherCompanyGuard extends IGuardWithCompany {
    averageRating: number;
    guardRatingCount: number;
    guardRatingRehirablePercentage: number;
}
