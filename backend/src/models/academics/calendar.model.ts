import mongoose, { Schema } from 'mongoose';
import { ICalendar } from '../../interfaces/academics.interface';

const CalendarSchema: Schema = new Schema(
  {
    year: { type: String, required: true },
    term: { type: String, required: true },
    commenceDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<ICalendar>('calendar', CalendarSchema);
