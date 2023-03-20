export type Tag = {
    _id: Types.ObjectId;
    name: string
    picture?: string
    keywords: Array<Types.ObjectId>
}