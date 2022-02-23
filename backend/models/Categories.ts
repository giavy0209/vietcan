import {model, Schema, Types} from 'mongoose'
import { CategoriesInterface } from './interface'


const CategoriesSchema = new Schema<CategoriesInterface>({
    name : {
        vi : {type : String , default : ''},
        en : {type : String , default : ''}
    },
    slug : {
        vi : {type : String , default : ''},
        en : {type : String , default : ''},
    },
    description : {
        vi : {type : String , default : ''},
        en : {type : String , default : ''},
    },
    image : {
        vi : {type : Types.ObjectId , ref : 'uploads'},
        en : {type : Types.ObjectId , ref : 'uploads'},
    },
    level : {type : Number, min : 0 , max : 2 , default : 0},
    order : {type : Number, default : 0},
    parent : {type : Types.ObjectId , ref : 'categories'}
},{
    timestamps : true
})

export default model<CategoriesInterface>('categories' , CategoriesSchema) 