import { Keyword } from "./keyword"

export type Category = {
    name: string,
    picture?: string,
    keywords: Array<Types.ObjectId>
}