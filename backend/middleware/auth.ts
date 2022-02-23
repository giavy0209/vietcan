import {Request , Response , NextFunction} from 'express'
export default async function(req : Request, res : Response, next : NextFunction) {
    if(req?.headers?.['Authorization']){
        req.query._id = req.headers['Authorization']
        next()
    }else{
        return res.send({status : 401})
    }
};