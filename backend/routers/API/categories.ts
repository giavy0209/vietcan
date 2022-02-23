import {Router} from "express";
import {CategoriesController} from '../../controllers'
const routes = function (router : Router) {
    router.get('/categories', CategoriesController.get)
    router.post('/categories', CategoriesController.post)
    router.put('/categories', CategoriesController.put)
    router.delete('/categories', CategoriesController.delete)
}

export default routes