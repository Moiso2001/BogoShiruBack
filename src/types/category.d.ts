import { Keyword } from "./keyword"

export type Category = {
    name: string,
    picture?: string,
    keywords: Array<string | Types.ObjectId>
}