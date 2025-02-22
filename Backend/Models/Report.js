import { Schema, model } from 'mongoose';

const ReportSchema = new Schema(
    {
        title: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true }
    },
    { timestamps: true }
);

export default model('Report', ReportSchema);
