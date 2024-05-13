
import './Navbar.css'
import { assets } from '../../assets/index';
const { logo } = assets.images;

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={logo} alt="" />
      <h1>Admin Service</h1>
    </div>
  )
}

export default Navbar
