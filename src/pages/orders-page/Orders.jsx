/**
 * packages import
 */
import { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext'

/**
 * user defined components or other imports
 */
import './Orders.css'
import { assets, API_END_POINTS } from '../../assets/';
import axiosInstance from '../../helpers/axiosInstance';
import currencyFormatter from '../../helpers/currency.formatter';


/**
 * This page will display all the orders placed by user
 * @returns 
 */
const Order = () => {

  const { token, ordersData, fetchAllOrders } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const statusHandler = async (event, orderId) => {
    setIsLoading(true);
    try {
      console.log(event, orderId);

      const response = await axiosInstance.patch(

        `${API_END_POINTS.ORDERS}status/${orderId}`,
        { status: event.target.value },
        { headers: { 'x-access-token': token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [])

  return (
    <div className='order add'>
      <h3>Orders Page</h3>
      <div className="order-list">
        {ordersData.length > 0 && ordersData.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.images.parcelIcon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className='order-item-name'>{order?.address?.firstName + " " + order?.address?.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order?.address?.state + ", " + order?.address?.country + ", " + order?.address?.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order?.address?.phone}</p>
            </div>
            <p>Items : {order?.items.length}</p>
            <p>{currencyFormatter(order.amount)}</p>
            <select
              onChange={(e) => statusHandler(e, order.id)}
              value={order?.status}
              name=""
              id=""
            >
              <option value="Order created">Order created</option>
              <option value="Order processing">Order processing</option>
              <option value="Order dispatched">Order dispatched</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Order delivered">Order delivered</option>
              <option value="Order cancelled">Order cancelled</option>
            </select>

          </div>
        ))}
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-container">
            <div className="spinner"></div>
            <div>Processing...</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order
