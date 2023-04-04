import mongoose, { Schema } from "mongoose";

export const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing']
    },
    picture: {
        type: String
    },
    keywords: {
        type: [mongoose.Types.ObjectId]
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { strict: 'throw' })