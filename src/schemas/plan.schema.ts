import mongoose, { Schema } from "mongoose";

export const planSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    cost: {
        type: Number,
    },
    location: {
        type: String,
        required: [true, 'Location required']
    },
    spots: {
        type: [mongoose.Types.ObjectId]
        // required: [true, 'Categories are missing'] ??
    },
    rating: {
        type: Number,
        min: [1, 'Min number is 1'],
        max: [5, 'Max number is 5'],
    }
},{ strict: 'throw' })