import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderDetailsAsync } from "../features/order/orderSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const InvoiceComponent = () => {
 const dispatch = useDispatch();
 const { orderId } = useParams();

 const orderDetails = useSelector(state => state.order.order);
 console.log(orderDetails);

 useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetailsAsync(orderId));
    }
 }, [dispatch, orderId]);

 const { totalAmount, username, address, items } = orderDetails || {};

 return (
    <div className="pt-[150px] py-[40px] bg-gradient-to-r from-black via-purple-900 to-black font-sans">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 font-anta">Order Placed Successfully!</h2>
          <p className="text-lg font-semibold text-gray-600 font-anta">Invoice</p>
        </div>
        <div className="border-t border-gray-200 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg font-semibold text-gray-800 font-anta">Customer Name:</p>
            <span className="text-lg font-medium text-gray-600 font-anta">{username}</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg font-semibold text-gray-800 font-anta">Total Amount:</p>
            <span className="text-lg font-medium text-gray-600 font-anta">&#8377; {totalAmount}</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg text-left font-semibold text-gray-800 font-anta">Items:</p>
            <ul className="list-none list-inside text-gray-600">
              {items?.map((item, index) => (
                <li key={index} className="text-center font-anta lg:text-right">
                 {item.name} - {item.quantity} x &#8377;{item.price} - {item.size}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg font-semibold text-gray-800 font-anta">Shipping Address:</p>
            <p className="text-lg font-medium text-gray-600 font-anta">
              {address?.street}, {address?.city}, {address?.state}, {address?.pincode}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-lg font-semibold text-gray-800 font-anta">Contact:</p>
            <p className="text-lg font-medium text-gray-600 font-anta">{address?.phoneNumber}</p>
          </div>


          
        </div>
      </div>

      <div className="mt-8">
            <p className="text-lg lg:text-3xl font-semibold text-white text-center font-anta">Thank You for Shopping With Us!</p>
          </div>
    </div>
 );
};

export default InvoiceComponent;
