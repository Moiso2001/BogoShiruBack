export type spotContactInfo = {
    phone?: string,
    email?: string
}

export type spotSchedule = {
    Mar: string
    Mie: string
    Jue: string
    Vie: string
    Sab: string
    Dom: string
    Fes: string
}

export type Spot = {
    name: string
    contact_info: spotContactInfo
    address: string
    location: string
    pictures: string[]
    schedule: spotSchedule
    rating: Number
    cost: Number
    categories: Array<Types.ObjectId>
    tags: Array<Types.ObjectId>
    description: string
    deletedAt?: Date
}

export type SpotRequest = {
    keyword: string
    budget?: number
    location?: string
}
