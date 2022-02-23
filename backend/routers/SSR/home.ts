import {Router} from "express";
const routes = function (router : Router) {
    router.get('/' , (req,res) => {
        res.send('ok')
    })
}

export default routes