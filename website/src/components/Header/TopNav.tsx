import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector,RootStateOrAny } from 'react-redux'
import { actionChangeLanguage } from 'store/actions'
export default function TopNav() {
    const dispatch = useDispatch()
    const language = useSelector(( state : RootStateOrAny) => state.language)
    const [IsOpenSearch, setIsOpenSearch] = useState(false)
    const handleSearch = useCallback((e) => {
        e.preventDefault()
    },[])
    const handleChangeLanguage = useCallback(() => {
        dispatch(actionChangeLanguage(language === 'vi' ? 'en' : 'vi'))
    },[language])
    return (
        <>
            <ul className="top-nav">
                <li>
                    <Link to={'#'}>About us</Link>
                </li>
                <li>
                    <Link to={'#'}>About us</Link>
                </li>
                
                <li>
                    <Link to={'#'}>About us</Link>
                </li>
                <li>
                    <Link to={'#'}>About us</Link>
                </li>
                <li>
                    <Link to={'#'}>About us</Link>
                </li>
                <li>
                    <Link to={'#'}>About us</Link>
                </li>
                <li>
                    <div onClick={()=>setIsOpenSearch(!IsOpenSearch)}  className="search">
                        <div className="search-icon">
                            <FontAwesomeIcon icon={IsOpenSearch ? faClose : faSearch} />
                        </div>
                        <div className={`search-box ${IsOpenSearch ? 'show' : ''}`}>
                            <form onSubmit={handleSearch} action="/search" method='get'>
                                <input type="text" placeholder='Search...'/>
                                <button type='submit' className="search-icon"><FontAwesomeIcon icon={faSearch}/></button>
                            </form>
                        </div>
                    </div>
                    <div onClick={handleChangeLanguage} className={`language ${language}`}>
                        <span>VI</span>
                        <span>EN</span>
                    </div>
                </li>
            </ul>
        </>
    )
}