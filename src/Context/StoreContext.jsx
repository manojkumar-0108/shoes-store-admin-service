import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

import { BACKEND_BASE_URL } from "../assets";

const StoreContextProvider = (props) => {

    const url = BACKEND_BASE_URL;
    const [token, setToken] = useState("")

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])

    const contextValue = {
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;