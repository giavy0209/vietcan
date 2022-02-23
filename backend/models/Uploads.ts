import {model, Schema, Types} from 'mongoose'

const UploadsSchema = new Schema({
    name : {type : String, default : Date.now},
    slug : {type : String , required : true, unique : true},
    ext : {type : String, required : true}
})

export default model('uploads' , UploadsSchema)