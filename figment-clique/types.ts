import { ObjectId } from "mongodb"

export type catalog = [
    {
        _id: ObjectId,
        image: string,
        image2?: string
        title: string,
        price: string
    }
]