import mongoose, { Schema } from 'mongoose';
import { IClass } from '../../interfaces/academics.interface';

const ClassSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    shortName: { type: String, required: true },
    description: { type: String, default: null },
    rank: { type: Number, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IClass>('class', ClassSchema);
