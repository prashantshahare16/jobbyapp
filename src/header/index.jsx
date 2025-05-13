
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
           
           <ul >
            <li className='my-nav-items3'>
            <button
            
             className="btn btn-primary"
              
              onClick={() => {
                // Delete all cookies
                document.cookie.split(";").forEach((c) => {
                  document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                  
                  
                // Redirect to login page
                window.location.href = '/login';
              }}

            //   onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            <span className="menu-text">Logout</span>
            
            </button>
            
        </li>
           </ul>
              
   
    
  

        </nav>

    )
}


export default Header;
