import logo from '../../assets/images/logo.png'
import iso from '../../assets/images/iso.png'
import BottomNav from './BottomNav'
import TopNav from './TopNav'
export default function Header () {
    return(
        <>
        <header>
            <div className="container">
                <div className="row centerY">
                    <div className="col-2 col-push-1">
                        <a href="/">
                            <img src={logo} alt="" />
                        </a>
                    </div>
                    <div className="col-7">
                        <nav>
                            <TopNav />

                            <BottomNav />
                        </nav>
                    </div>
                    <div className="col-1 col-pull-1">
                        <img src={iso} alt="" />
                    </div>
                </div>

            </div>
        </header>
        </>
    )
}