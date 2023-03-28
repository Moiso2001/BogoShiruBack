export type Plan = {
    name: string
    cost: number
    location: string
    spots: Array<Types.ObjectId>
    rating: number
}