import mongoose, { Schema } from "mongoose";
import { spotContactInfoValidator, scheduleValidator } from "./controller/spot.controller";


export const spotSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing']
    },
    contact_info: {
        type: Object,
        required: [true, 'Contact info is missing'],
        validate: {
            validator: spotContactInfoValidator,
            message: "Incorrect email syntax"
        }
    },
    address: {
        type: String,
        required: [true, 'Address is missing']
    },
    location: {
        type: String,
        required: [true, 'Location is missing']
    },
    schedule: {
        type: Object,
        required: [true, 'Schedule is missing'],
        validate: {
            validator: scheduleValidator,
            message: "No empty strings allowed"
        }
    },
    pictures: [String],
    rating: {
        type: Number,
        min: [1, 'Min number is 1'],
        max: [5, 'Max number is 5'],
    },
    cost: {
        type: Number,
        min: [0, 'Min number is 0'],
        max: [5, 'Max number is 5'],
        required: [true, 'Cost is missing']
    },
    description: {
        type: String,
        maxlength: 3000
    },
    categories: {
        type: [mongoose.Types.ObjectId]
        // required: [true, 'Categories are missing'] ??
    },
    tags: {
        type: [mongoose.Types.ObjectId]
        // required: [true, 'Categories are missing'] ??
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { strict: 'throw' })