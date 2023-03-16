import { spotContactInfo } from "../spot"

export class SpotDto {
    name: string
    contact_info: spotContactInfo
    address: string
    pictures: string[]
    rating: Number
    categories: string[]
    tags: string[]
}