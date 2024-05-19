import { useState, useContext } from 'react';
import axiosInstance from '../../helpers/axiosInstance';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';
import './Add.css';
import { assets, API_END_POINTS } from '../../assets';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../helpers/firebaseConfig';

const { SHOES } = API_END_POINTS;

const Add = () => {
    const { token } = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Sneakers"
    });

    const [image, setImage] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Set loading to true when form is submitted

        try {
            // Upload image and get URL
            const image_url = await handleUpload();

            //setting image url in data
            data.image = image_url;

            const response = await axiosInstance.post(
                `${SHOES}`,
                data,
                { headers: { 'x-access-token': token } }
            );

            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Sneakers"
                })
                setImage(false);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false); // Set loading to false after form submission completes
        }
    }

    const handleUpload = () => {
        return new Promise((resolve, reject) => {
            if (!image) {
                reject("No image selected");
                return;
            }

            const storageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed',
                (snapshot) => {

                },
                (error) => {
                    console.error("Upload failed:", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setImageUrl(url);
                        console.log("Image URL:", url);
                        resolve(url);
                    }).catch((error) => {
                        console.error("Error getting download URL:", error);
                        reject(error);
                    });
                }
            );
        });
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                {isLoading && <div className="loading-spinner"></div>} {/* Render loading spinner if isLoading is true */}
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
                            <option value="Sneakers">Sneakers</option>
                            <option value="Boots">Boots</option>
                            <option value="Athletic Shoes">Athletic Shoes</option>
                            <option value="Sandals">Sandals</option>
                            <option value="Loafers">Loafers</option>
                            <option value="Oxfords">Oxfords</option>
                            <option value="Sandals">Bluchers</option>
                            <option value="Loafers">Slippers</option>
                            <option value="Oxfords">Moccasins</option>
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

            {isLoading && (
                <div className="loading-overlay">
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <div>Processing...</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Add;
