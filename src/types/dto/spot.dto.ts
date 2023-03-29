import { spotContactInfo } from "../spot"

export class SpotDto {
    name: string
    contact_info: spotContactInfo
    address: string
    pictures: string[]
    rating: Number
    price: Number
    categories: string[]
    tags: string[]
}

export class SpotRequestDto {
    keyword: string
    budget?: number
    location?: string
}