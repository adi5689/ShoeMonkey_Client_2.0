import React, { useState, useEffect } from 'react';
import { fetchCartDataAsync, selectTotalCartAmount } from '../features/cart/cartSlice';
import { selectLoggedInUserEmail, selectLoggedInUserName } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrderDetailsAsync, placeOrderAsync } from '../features/order/orderSlice';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';




const AddressModal = () => {
 const [address, setAddress] = useState({
    street: '',
    pincode: '',
    city: '',
    state: '',
    phoneNumber:'',
 });

 const navigate = useNavigate();
 const dispatch = useDispatch();

 const totalAmount = useSelector(selectTotalCartAmount);
 const userEmail = useSelector(selectLoggedInUserEmail);
 const userName = useSelector(selectLoggedInUserName);
//  const orderId = useSelector(selectOrderId);
 

 console.log(userName)

 const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
 };

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    const actionResult = await dispatch(placeOrderAsync({
      email: userEmail, 
      address: address,
      totalValue: totalAmount,
    }));

    const result = unwrapResult(actionResult);
    console.log('result',result);

    if (result.success) {
      const orderId = result.orderId;
      console.log(orderId);
      setTimeout(() => {
         dispatch(fetchOrderDetailsAsync(orderId));
        dispatch(fetchCartDataAsync())
        navigate(`/invoice/${orderId}`);
      }, 2000);
      
      toast.success(result.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // navigate('/invoice');
    }
  } catch(error) {
    console.error('Error in checkout:', error);
    toast.error("Error checking out!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

 return (
  <div className="bg-white/40 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
  <h2 className="text-2xl font-bold mb-4">Enter Your Address</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <input
      type="text"
      name="street"
      placeholder="Street"
      value={address.street}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="pincode"
      placeholder="Pincode"
      value={address.pincode}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="city"
      placeholder="City"
      value={address.city}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="state"
      placeholder="State"
      value={address.state}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="phoneNumber"
      placeholder="Phone Number"
      value={address.phoneNumber}
      onChange={handleChange}
      className="input-field"
    />
    <button type="submit" className="btn_dark_rounded">
      Proceed to Checkout
    </button>
  </form>
</div>
 );
};

export default AddressModal;
