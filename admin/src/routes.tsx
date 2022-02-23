import {Login,Categories} from './pages'
const routes = [
    {
        path : '/login',
        page : () => <Login />,
        menu : false
    },
    {
        path : '/categories',
        page : () => <Categories />,
        menu : true,
        name : 'Danh mục'
    }
]
export default routes