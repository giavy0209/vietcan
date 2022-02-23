import { Types } from "mongoose";

export interface CategoriesInterface {
    name? : {
        vi? : string,
        en? : string
    },
    slug? : {
        vi? : string,
        en? : string
    },
    description? : {
        vi? : string,
        en? : string
    },
    image? : {
        vi? : string,
        en? : string
    },
    level? : number,
    order? : number,
    parent? : Types.ObjectId | string
}
