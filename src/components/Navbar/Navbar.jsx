
import './Navbar.css'
import { assets } from '../../assets/index';
const { adminLogo } = assets.images;

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={adminLogo} alt="" />
      <h1>Admin Service</h1>
    </div>
  )
}

export default Navbar
