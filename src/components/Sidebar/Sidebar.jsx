import './Sidebar.css';

import { NavLink } from 'react-router-dom';

import { IconContext } from "react-icons";
import { BsBox } from "react-icons/bs";
import { RiAddBoxLine, RiAlignJustify } from "react-icons/ri";


function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-options'>
                <NavLink
                    to='/add'
                    className="sidebar-option no-underline"
                >
                    <IconContext.Provider value={{ size: '20px' }}>
                        <RiAddBoxLine />
                    </IconContext.Provider>

                    <p>Add Products</p>
                </NavLink>

                <NavLink
                    to='/list'
                    className="sidebar-option no-underline"
                >
                    <IconContext.Provider value={{ size: '20px', border: '2px' }}>
                        <RiAlignJustify />
                    </IconContext.Provider>
                    <p>Show Products</p>
                </NavLink>

                <NavLink
                    to='/orders'
                    className="sidebar-option no-underline"
                >
                    <IconContext.Provider value={{ size: '18px' }}>
                        <BsBox />
                    </IconContext.Provider>
                    {/* <img
                        src={orderIcon}
                        alt=""
                    /> */}
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar