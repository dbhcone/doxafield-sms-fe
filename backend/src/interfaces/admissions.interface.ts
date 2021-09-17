import { Document } from "mongoose";
import { IClass } from "./academics.interface";

export interface IAdmission extends Document {
    personalDetails: IPersonalDetails,
    healthDetails?: IHealthDetails,
    schoolHistory?: ISchoolHistory,
    addressAndBackground?: IAddressAndBackground,
    admissionDate: Date,
    admittedTo?: IClass['_id'];
}

export interface IPersonalDetails {
    surname: string;
    firstName: string;
    OtherNames?: string;
    gender: string;
    dob?: Date;
    photourl?: string;
}

export interface IHealthDetails {
    bloodGroup?: string;
    sickleCellStatus?: string;
    allergies?: string;
    specialComments?: string;
}

export interface IAddressAndBackground {
    address: string;
    ghPostCode: string;
    tribe: string;
    religion: string;
    hometown: string;
    nationality: string;
}

export interface ISchoolHistory {
    lastSchoolAttended: string;
    location: string;
    reasonForLeaving?: string;
    yearOfLeaving?: string;
}

export interface IGuardian extends Document {
    surname: string;
    firstName: string;
    otherNames?: string;
    gender: string;
    occupation: string;
    primaryContact: string;
    otherContact?: string;
    emailAddress?: string;
    address: string;
}

export interface IGuardian extends Document {

}