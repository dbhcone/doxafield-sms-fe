import mongoose, { Schema } from 'mongoose';
import { IAdmission } from '../../interfaces/admissions.interface';
const AdmissionSchema: Schema = new Schema(
  {
    personalDetails: {
      surname: { type: String, required: true },
      firstName: { type: String, required: true },
      otherNames: { type: String },
      gender: { type: String, required: true },
      dob: { type: Date },
      photourl: { type: String },
    },
    addressAndBackground: {
      address: { type: String },
      ghPostCode: { type: String },
      tribe: { type: String },
      religion: { type: String },
      hometown: { type: String },
      nationality: { type: String },
    },
    schoolHistory: {
      lastSchoolAttended: { type: String },
      location: { type: String },
      reasonForLeaving: { type: String },
      yearOfLeaving: { type: String },
    },
    healthDetails: {
      bloodGroup: { type: String },
      sickleCellStatus: { type: String },
      allergies: { type: String },
      specialComments: { type: String },
    },
    admissionDate: { type: Date, default: new Date() },
    admittedTo: { type: Schema.Types.ObjectId, ref: 'class' },
  },
  { timestamps: true }
);

export default mongoose.model<IAdmission>('admission', AdmissionSchema);
