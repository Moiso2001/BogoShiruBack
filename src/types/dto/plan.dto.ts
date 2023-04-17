import { Types } from "mongoose"

export class PlanDto {
    name: string
    cost: number
    location: string
    spots: string[]
    rating: number
}

export class PlanRequestDto {
    keyword: string
    budget?: number
    location?: string
}