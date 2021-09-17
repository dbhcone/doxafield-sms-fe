import { Document } from "mongoose";

export interface ISubject extends Document {
    fullName: string;
    shortName: string;
    description: string;
} 

export interface IClass extends Document {
    fullName: string;
    shortName: string;
    description: string;
    rank: number;
}

export interface ICalendar extends Document {
    year: string;
    term: string;
    commenceDate: Date;
    endDate?: Date;
}

export interface ISubjectClass extends Document {
    subject: ISubject['id'];
    class: IClass['id'];
    calendar: ICalendar['id'];
}