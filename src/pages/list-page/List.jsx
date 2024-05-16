import { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify';

import axiosInstance from '../../helpers/axiosInstance';
import currencyFormatter from '../../helpers/currency.formatter';

import './List.css'

import { API_END_POINTS, BACKEND_BASE_URL } from '../../assets';
const { SHOES } = API_END_POINTS;

import { IconContext } from "react-icons";
import { MdDeleteForever } from "react-icons/md";

import { StoreContext } from '../../Context/StoreContext'

const List = () => {

  const { token } = useContext(StoreContext);

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axiosInstance.get(
      `${SHOES}`,
      { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } }
    );

    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error(response.data.message)
    }
  }

  const removeShoe = async (shoeId) => {
    const response = await axiosInstance.delete(
      `${SHOES}${shoeId}`,
      { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } }
    );
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

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
              <img src={`${BACKEND_BASE_URL}/images/` + item.image} alt="" />
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
    </div>
  )
}

export default List
