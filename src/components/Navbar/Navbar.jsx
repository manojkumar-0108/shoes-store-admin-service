
import './Navbar.css'
import { assets } from '../../assets';
const { adminLogo, profileIcon } = assets.images;

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

import { IconContext } from "react-icons";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = ({ setShowLogin }) => {

  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  return (
    <>

      <div className='navbar-container'>

        <div className='navbar'>
          <img className='logo' src={adminLogo} alt="" />
          <h1>Admin Service</h1>
        </div>

        <div className="navbar-right">

          {!token
            ?
            <button onClick={() => setShowLogin(true)}>
              sign in
            </button>
            :
            <div className='navbar-profile'>

              <img
                src={profileIcon}
                alt=""
              />

              <ul className='navbar-profile-dropdown'>
                <li onClick={logout}>
                  <IconContext.Provider value={{ size: '20px' }}>
                    <AiOutlineLogout />
                  </IconContext.Provider>
                  <p>Logout</p>
                </li>
              </ul>

            </div>
          }

        </div>

      </div>

    </>

  )
}

export default Navbar
