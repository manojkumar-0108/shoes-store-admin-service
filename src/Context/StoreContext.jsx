import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_BASE_URL, API_END_POINTS } from "../assets";
import axiosInstance from "../helpers/axiosInstance";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = BACKEND_BASE_URL;
    const [token, setToken] = useState("");

    const [list, setList] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [appLoading, setAppLoading] = useState(false);

    const fetchList = async () => {
        try {
            const response = await axiosInstance.get(
                `${API_END_POINTS.SHOES}`,
                { headers: { 'x-access-token': token } }
            );

            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error('Failed to get all products', response.data.message);
            }
        } catch (error) {
            toast.error('An error occurred while fetching products.');
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
            } else {
                setOrdersData([]);
                toast.error('Failed to get all orders', response.data.message);
            }
        } catch (error) {
            setOrdersData([]);
            toast.error('An error occurred while fetching orders.');
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
        const fetchData = async () => {
            if (token) {
                setAppLoading(true);
                await fetchList();
                await fetchAllOrders();
                setAppLoading(false);
            }
        }
        fetchData();
    }, [token]);

    const contextValue = {
        url,
        token,
        setToken,
        list,
        setList,
        fetchList,
        ordersData,
        fetchAllOrders,
        setOrdersData,
        appLoading,
        setAppLoading
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
