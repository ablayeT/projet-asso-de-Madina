import mongoose, { Document, Schema } from "mongoose";

export interface IMeeting extends Document {
  title: string;
  description: string;
  date: Date;
  attendees: mongoose.Schema.Types.ObjectId[];
}

const meetingSchema: Schema<IMeeting> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Meeting = mongoose.model<IMeeting>("Meeting", meetingSchema);

export default Meeting;
