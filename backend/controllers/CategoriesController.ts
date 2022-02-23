import {Request,Response} from "express";
import {Categories} from '../models'
import { CategoriesInterface} from "../models/interface";
import {FilterQuery, isValidObjectId} from 'mongoose'
class CategoriesController {
    static async get(req : Request,res : Response) {
        const {skip, limit, level   } = req.query
        const search = req.query.search as string
        const _skip = Number(skip) || 0
        const _limit = Number(limit) || 99
        const _level = level ? Number(level) : -1
        const _search = search?.trim()

        const query : FilterQuery<CategoriesInterface> = {}
        if(_search) {
            query.$or = [
                {
                    vi : {$regex : `.*${search}.*`}
                },
                {
                    en : {$regex : `.*${search}.*`}
                },
            ]
        }
        if(_level !== -1) query.level = _level

        const data = await Categories.find(query)
        .skip(_skip)
        .limit(_limit)
        .sort({
            level : 1,
            order : 1
        })
        const total = await Categories.countDocuments(query)
        res.send({status : 1 , data, total})
    }

    static async post(req : Request,res : Response) {
        const body = req.body
        console.log(body);
        
        const parent = body.parent
        let level = 0
        
        if(parent && isValidObjectId(parent)) {
            
            const findParent = await Categories.findById(parent)
            console.log({findParent});
            if(findParent) {
                if(findParent.level === 2) return res.send({status : 100 , msg : 'Max parent level'})
                level = findParent.level as number
                level++
            }else delete body.parent
        }else delete body.parent


        console.log({level});
        
        const data = new Categories<CategoriesInterface>({...body , level})
        await data.save()
        res.send({status : 1 , data})
    }
    static async put(req : Request,res : Response) {
        const {_id} = req.query
        if(!_id || !isValidObjectId(_id)) return res.send({status : 100 , msg : 'ID is not valid'})
        const body = req.body
        const data = await Categories.findByIdAndUpdate(_id , body)
        res.send({status : 1 , data})
    }
    static async delete(req : Request,res : Response) {
        const {_id} = req.query
        if(!_id || !isValidObjectId(_id)) return res.send({status : 100 , msg : 'ID is not valid'})
        await Categories.findByIdAndDelete(_id)
        res.send({status : 1})
    }
}

export default CategoriesController