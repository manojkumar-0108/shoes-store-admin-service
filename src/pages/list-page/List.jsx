import { useContext, useState } from 'react'
import { toast } from 'react-toastify';

import axiosInstance from '../../helpers/axiosInstance';
import currencyFormatter from '../../helpers/currency.formatter';

import './List.css'

import { API_END_POINTS } from '../../assets';
const { SHOES } = API_END_POINTS;

import { IconContext } from "react-icons";
import { MdDeleteForever } from "react-icons/md";

import { StoreContext } from '../../Context/StoreContext';

const List = () => {

  const { token, list, fetchList } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const removeShoe = async (shoeId) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(
        `${SHOES}${shoeId}`,
        { headers: { 'x-access-token': token } }
      );
      await fetchList();

      if (response.data.success) {
        toast.success(response.data.message);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className='list add flex-col'>
      <p className='list-title'>Products list</p>

      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>

              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currencyFormatter(item.price)}</p>

              <IconContext.Provider value={{ size: '20px' }}>
                <MdDeleteForever
                  className='delete-icon'
                  onClick={() => removeShoe(item.id)}
                />
              </IconContext.Provider>

            </div>
          )
        })}

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

export default List
