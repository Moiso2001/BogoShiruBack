import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    plans_made: {
        type: [mongoose.Types.ObjectId],
    },
    spots_visited: {
        type: [mongoose.Types.ObjectId]
    },
    profile_picture: {
        type: String,
        required: true
    }
})