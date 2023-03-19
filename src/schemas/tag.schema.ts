import mongoose, { Schema } from "mongoose";

export const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing']
    },
    picture: {
        type: String
    },
    keyword: {
        types: [mongoose.Types.ObjectId]
    }
}, { strict: 'throw' })