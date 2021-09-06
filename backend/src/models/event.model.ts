import mongoose, { Schema } from 'mongoose';
import { IEvent } from '../interfaces/event.interface';

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  speaker: { type: String, required: true },
  venue: { type: String, required: true },
  flyer: { type: Object, required: true },
  description: { type: String, required: true },
  extraDetails: { type: Object, default: null },
  photos: [{type: String, default: null}]
}, {timestamps: true});

export default mongoose.model<IEvent>('Events', EventSchema);
