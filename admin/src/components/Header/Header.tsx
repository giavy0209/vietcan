import { Menu } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import routes from 'routes';
export default function Header () {
    const [ActiveMenu , setActiveMenu] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        setActiveMenu(location.pathname);
        
    },[location])
    const handleNav = useCallback(e  => {
        setActiveMenu(e.key)
        navigate(e.key)
    },[navigate])
    return(
        <Menu onClick={handleNav} selectedKeys={[ActiveMenu]} mode="horizontal">
            {
                routes.map(o => o.menu ? (
                    <Menu.Item key={o.path}>{o.name}</Menu.Item>
                ) : null)
            }
        </Menu>
    )
}