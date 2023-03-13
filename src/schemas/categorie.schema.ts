import { Schema } from "mongoose";

export const categorieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing']
    },
    picture: {
        type: String
    }
})