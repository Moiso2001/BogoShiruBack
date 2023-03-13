import { Schema } from "mongoose";

export const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing']
    },
    picture: {
        type: String
    }
})