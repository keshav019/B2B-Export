import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../globalComponents/Error';
import { Link, useNavigate } from 'react-router-dom';
import { addProduct } from '../store/actions/vendorAction';
import Button from '../globalComponents/Button';
const AddProduct = () => {

  const { loading, error, message } = useSelector(state => state.vendor);
  const { data } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    price: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('image', formData.image);
    dispatch(addProduct(formDataToSend));
  };
  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else if (data.role !== "vendor") {
      navigate("/");
    }
  }, [])

  return (
    <div className='min-h-screen'>
      <form className="max-w-md mx-auto mt-4 p-4 border">
        {!loading && error && <Error message={error} />}
        {!loading && message &&
          <div className="bg-green-200 p-4 rounded-md text-center">
            <p className="text-green-800">
              {message} <Link to="/" className="text-blue-500 underline">Got to home</Link>
            </p>
          </div>}
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-600 font-medium">
            Title :
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-600 font-medium">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="vendor" className="block text-gray-600 font-medium">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min={0}
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600 font-medium">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
            accept="image/*"
            required
          />
        </div>
        <Button loading={loading} text="Add Product" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default AddProduct;
