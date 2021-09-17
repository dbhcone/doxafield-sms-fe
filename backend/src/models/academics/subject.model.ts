import mongoose, { Schema } from 'mongoose';
import { ISubject } from '../../interfaces/academics.interface';

const SubjectSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    shortName: { type: String, required: true },
    description: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<ISubject>('subject', SubjectSchema);
