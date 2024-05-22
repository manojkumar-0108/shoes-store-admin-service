import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

import { toast } from "react-toastify";

import { BACKEND_BASE_URL, API_END_POINTS } from "../assets";
import axiosInstance from "../helpers/axiosInstance";

const StoreContextProvider = (props) => {

    const url = BACKEND_BASE_URL;
    const [token, setToken] = useState("");

    const [list, setList] = useState([]);
    const [ordersData, setOrdersData] = useState([]);

    const fetchList = async () => {
        const response = await axiosInstance.get(
            `${API_END_POINTS.SHOES}`,
            { headers: { 'x-access-token': token } }
        );

        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error(response.data.message);
        }
    }

    const fetchAllOrders = async () => {
        try {
            const response = await axiosInstance.get(
                `${API_END_POINTS.ORDERS}`,
                { headers: { 'x-access-token': token } }
            );

            if (response.data.success) {
                setOrdersData(response.data.data);
                toast.success(response.data.message);
            } else {
                setOrdersData([]);
                toast.error(response.data.message);
            }
        } catch (error) {
            setOrdersData([]);
            console.log(error);
        }
    }

    // Effect to set the initial token from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Effect to fetch data when the token changes
    useEffect(() => {
        if (token) {
            fetchList();
            fetchAllOrders();
        }
    }, [token]);

    const contextValue = {
        url,
        token,
        setToken,
        list,
        setList,
        fetchList,
        ordersData,
        fetchAllOrders
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
