import { Schema } from "mongoose";

const categorieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing']
    },
    picture: {
        type: String
    }
})