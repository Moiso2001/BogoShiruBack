import { Types } from "mongoose"

export class PlanDto {
    name: string
    cost: number
    location: string
    spots: string[]
    rating: number
}