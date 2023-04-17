import mongoose, { Schema } from "mongoose";

export const planSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    cost: {
        type: Number,
        required: [true, 'Cost required']
    },
    location: {
        type: String,
        required: [true, 'Location required']
    },
    spots: {
        type: [mongoose.Types.ObjectId]
    },
    rating: {
        type: Number,
        min: [1, 'Min number is 1'],
        max: [5, 'Max number is 5'],
    },
    pictures: {
        type: [String]
    },
    deletedAt: {
        type: Date,
        default: null
    }
},{ strict: 'throw' })