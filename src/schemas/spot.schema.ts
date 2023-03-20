import mongoose, { Schema } from "mongoose";
import { spotContactInfoValidator } from "./controller/spot.controller";


export const spotSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing']
    },
    contact_info: {
        type: Object,
        validate: {
            validator: spotContactInfoValidator
        }
    },
    address: {
        type: String,
        required: true
    },
    pictures: [String],
    rating: {
        type: Number,
        min: [1, 'Min number is 1'],
        max: [5, 'Max number is 5'],
    },
    categories: {
        type: [mongoose.Types.ObjectId]
        // required: [true, 'Categories are missing'] ??
    },
    tags: {
        type: [mongoose.Types.ObjectId]
        // required: [true, 'Categories are missing'] ??
    }
}, { strict: 'throw' })