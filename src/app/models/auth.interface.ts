export interface IAccount {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    otherNames?: string;
    primaryMobileNumber: string;
    otherNumbers?: string[];
    occupation?: string;
    gender: string;
}

/**
 * Base Credentials interface for users.
 * Root is for pupils / students
 */
export interface ICredentials {
    username: string;
    password: string;
}

export interface IAdminCredentials extends ICredentials {
    email: string;
}

export interface IStaffCredentials extends ICredentials {
    staffId: string;
}

export interface IUser {
    id: string;
    username: string;
    role: string;
}

export interface IProfile {
    facebookHandle?: string;
    instagramHandle?: string;
    twitterHandle?: string;
}
