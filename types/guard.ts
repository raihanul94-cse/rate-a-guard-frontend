import { ICompany } from "./user";

export interface IGuard {
    uuid: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    licenseNumber: string;
    licenseType: string;
    licenseExpirationDate: string;
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
}

export interface IGuardTable extends IGuard {
    guardLicenses: IGuardLicense[];
}

export interface IGuardFilter {
    status: string;
    state: string;
    type: string;
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

export interface IGuardLatestRating {
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
    guardLatestRating: IGuardLatestRating;
}
