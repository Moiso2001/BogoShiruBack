import { Schema } from "mongoose";

export const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing']
    },
    picture: {
        type: String
    }
}, { strict: 'throw' })