
import { Link } from 'react-router-dom';
import './index.css'


const Header = ()=>{



    return (

        <nav className='my-nav'>
                    <Link to="/">
                        <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" className='web-logo' />
                    </Link>

                <ul className='nav-ul-cont'>
                    <li>
                        <Link to="/" className='my-nav-items1'>
                        <i className="fa-solid fa-house"></i>
                        <span className="menu-text">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/jobs"  className='my-nav-items2'>
                        <i className="fa-solid fa-briefcase"></i>
                        <span className="menu-text">Jobs</span>
                        </Link>
                    </li>
                </ul>

                <button className='btn btn-primary'>
                <i className="fas fa-sign-out-alt"></i> {/* Logout Icon */}

                <span className="menu-text">Logout</span>
                    </button>

        </nav>

    )
}


export default Header;
