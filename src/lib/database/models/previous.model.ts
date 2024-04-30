import { Document, Schema, model, models } from "mongoose";

export interface IPrevious extends Document {
    date: Date;
    description: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    }
    createdAt?: Date;
    updatedAt?: Date;
}


const PreviousSchema = new Schema({
    description: { type: String, required: false},
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Previous = models?.Previous || model('Previous', PreviousSchema);

export default Previous