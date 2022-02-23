import {Router} from "express";
import categories from './categories'
interface router {
    (router : Router) : void
}

const API : [router] = [
    categories
]

export default API