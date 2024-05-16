import { useState, useContext } from 'react'
import axiosInstance from '../../helpers/axiosInstance';
import { toast } from 'react-toastify';

import { StoreContext } from '../../Context/StoreContext'
import './Add.css'

import { assets, API_END_POINTS } from '../../assets';
const { ADD_SHOE } = API_END_POINTS;


const Add = () => {

    const { token } = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Air Jordan"
    });

    const [image, setImage] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axiosInstance.post(
            `${ADD_SHOE}`,
            formData,
            { headers: { 'x-access-token': token, 'Content-Type': 'multipart/form-data' } }
        );

        if (response.data.success) {
            toast.success(response.data.message)
            setData({
                name: "",
                description: "",
                price: "",
                category: "Air Jordan"
            })
            setImage(false);
        }
        else {
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <label
                        htmlFor="image"
                    >
                        <img
                            src={!image ? assets.images.uploadArea : URL.createObjectURL(image)}
                            alt=""
                        />
                    </label>
                    <input
                        onChange={(e) => { setImage(e.target.files[0]) }}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>

                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input
                        name='name'
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        placeholder='Type here'
                        required
                    />
                </div>

                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea
                        name='description'
                        onChange={onChangeHandler}
                        value={data.description}
                        type="text"
                        rows={6}
                        cols={35}
                        placeholder='Write content here'
                        required
                    />
                </div>

                <div className='add-category-price'>

                    <div className='add-category flex-col'>
                        <p>Product category</p>

                        <select
                            name='category'
                            onChange={onChangeHandler}
                        >
                            <option value="Air Jordan">Air Jordan</option>
                            <option value="Air Jordan">Air Jordan</option>
                            <option value="Air Jordan">Air Jordan</option>

                        </select>
                    </div>

                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input
                            type="Number"
                            name='price'
                            onChange={onChangeHandler}
                            value={data.price}
                            placeholder='₹1,250'
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn' >ADD</button>
            </form>
        </div>
    )
}

export default Add
