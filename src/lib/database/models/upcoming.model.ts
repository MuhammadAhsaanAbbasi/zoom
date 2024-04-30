import { Document, Schema, model, models } from "mongoose";

export interface IUpComing extends Document {
    link: string;
    description: string;
    call_id: string;
    date: Date;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    }
    createdAt?: Date;
    updatedAt?: Date;
}


const UpComingSchema = new Schema({
    link: { type: String , required: true },
    description: { type: String, required: false },
    call_id: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const UpComing = models?.UpComing || model('UpComing', UpComingSchema);

export default UpComing