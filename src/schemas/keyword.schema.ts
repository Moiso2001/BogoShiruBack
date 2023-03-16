import { Schema } from "mongoose";

export const keywordSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Keyword name is missing']
    }
}, {strict: 'throw'})