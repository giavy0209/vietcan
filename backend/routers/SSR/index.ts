import {Router} from "express";
import home from './home'

interface router {
    (router : Router) : void
}

const API : [router] = [
    home
]

export default API