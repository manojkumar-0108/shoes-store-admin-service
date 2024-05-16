import axios from 'axios'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { StoreContext } from '../../Context/StoreContext'

import './LoginPopup.css'

import { IconContext } from "react-icons";
import { IoCloseCircleOutline } from "react-icons/io5";


const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url } = useContext(StoreContext)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        let new_url = url + "/api/user/login";

        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">

                <div className="login-popup-title">
                    <h2>Login</h2>

                    <IconContext.Provider value={{ size: '20px' }}>
                        <IoCloseCircleOutline onClick={() => setShowLogin(false)} />
                    </IconContext.Provider>

                </div>

                <div className="login-popup-inputs">

                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                    />

                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>

                <button>
                    Login
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
            </form>
        </div>
    )
}

export default LoginPopup
