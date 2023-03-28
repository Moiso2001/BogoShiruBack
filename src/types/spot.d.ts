export type spotContactInfo = {
    phone?: string,
    email?: string
}

export type Spot = {
    name: string
    contact_info: spotContactInfo
    address: string
    pictures: string[]
    rating: Number
    categories: Array<Types.ObjectId>
    tags: Array<Types.ObjectId>
    description: string
}
