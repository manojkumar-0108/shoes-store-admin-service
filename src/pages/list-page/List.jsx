import { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

import currencyFormatter from '../../helpers/currency.formatter';
import './List.css'
import { BACKEND_BASE_URL } from '../../assets';
import { IconContext } from "react-icons";
import { MdDeleteForever } from "react-icons/md";


const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const removeShoe = async (foodId) => {
    const response = await axios.post(`${BACKEND_BASE_URL}/api/food/remove`, {
      id: foodId
    })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
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
