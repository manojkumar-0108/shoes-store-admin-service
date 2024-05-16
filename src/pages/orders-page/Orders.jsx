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
import { assets, BACKEND_BASE_URL, API_END_POINTS } from '../../assets/';
const { ORDERS } = API_END_POINTS;

import axiosInstance from '../../helpers/axiosInstance';

/**
 * This page will display all the orders placed by user
 * @returns 
 */

const Order = () => {

  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    const response = await axiosInstance.get(
      ORDERS,
      { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } }
    );

    if (response.data.success) {
      setOrders(response.data.data.reverse());
    }
    else {
      toast.error(response.data.message);
    }
  }

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axiosInstance.post(`${BACKEND_BASE_URL}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }


  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.images.adminLogo} alt="" />
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
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order.id)}
              value={order.status}
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
    </div>
  )
}

export default Order
