import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbTrash } from "react-icons/tb";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Empty from "../assets/empty-cart.jpg";
import {
  selectIsLoggedIn,
  selectLoggedInUserEmail,
  selectLoggedInUserName,
} from "../features/user/userSlice";
import {
  fetchCartDataAsync,
  removeFromCartAsync,
  selectTotalCartAmount,
  selectTotalCartItems,
} from "../features/cart/cartSlice";
import AddressModal from "./AddressModal";


const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userEmail = useSelector(selectLoggedInUserEmail);
  const totalAmount = useSelector(selectTotalCartAmount);
  const totalItems = useSelector(selectTotalCartItems);
  const userName = useSelector(selectLoggedInUserName);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const navigate = useNavigate();

  console.log(userName);

  const handleProceedClick = () => {
    setIsAddressModalVisible(true);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { redirectTo: "/cart" } });
    }
  }, [isLoggedIn, navigate]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCartDataAsync());
    }
  }, [dispatch, isLoggedIn, userEmail]);

  const handleRemoveFromCart = (id) => {
    dispatch(
      removeFromCartAsync({
        email: userEmail,
        productId: id,
      })
    );
    setTimeout(() => {
      dispatch(fetchCartDataAsync());
    }, 1000);

    toast.success(`Product removed from cart!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  console.log("Cart items:", cartItems);

  return (
    <section className="pt-[112px] text-white pb-[50px] max_padd_container bg-gradient-to-r font-anta from-black via-purple-900 to-black">
      {totalItems > 0 ? (
        <div className="flex flex-col items-center justify-center">
          <table className="w-full mx-auto">
            <thead>
              <tr className="bg-white/60 regular-16 sm:regular-22 text-start py-12">
                <th className="p-1 py-2">Products</th>
                <th className="p-1 py-2">Title</th>
                <th className="p-1 py-2">Size</th>
                <th className="p-1 py-2">Price</th>
                <th className="p-1 py-2">Quantity</th>
                <th className="p-1 py-2">Total</th>
                <th className="p-1 py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.productId}
                  className="text-center border-b border-white/60 p-6 medium-14"
                >
                  <td className="flexCenter">
                    <img
                      src={item.images[0]}
                      alt="p_img"
                      height={43}
                      width={43}
                      className="rounded-lg ring-1 ring-white/80 my-1"
                    />
                  </td>
                  <td>
                    <div className="line-clamp-2">{item.name}</div>
                  </td>
                  <td className="w-16">{item.size}</td>
                  <td className="w-16">&#8377; {item.price}</td>
                  <td className="bg-white/60 w-[10px] text-black">
                    {item.quantity}
                  </td>
                  <td className="w-16">&#8377; {item.price * item.quantity}</td>
                  <td>
                    <div className="flexCenter">
                      <TbTrash
                        onClick={() => handleRemoveFromCart(item.productId)}
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* CART DETAILS */}
          <div className="flex-col gap-20 my-16 p-8 md:flex-row rounded-md bg-white/10 w-full max-w-[666px]">
            <div className="flex flex-col gap-10">
              <h4 className="bold-20">Summary</h4>
              <div>
                <div className="flexBetween py-4">
                  <h4 className="medium-16">Subtotal:</h4>
                  <h4 className="text-white font-semibold">
                    &#8377;{totalAmount}
                  </h4>
                </div>
                <hr />
                <div className="flexBetween py-4">
                  <h4 className="medium-16">Shipping Fee:</h4>
                  <h4 className="text-white font-semibold">Free</h4>
                </div>
                <hr />
                <div className="flexBetween py-4">
                  <h4 className="bold-18">Total:</h4>
                  <h4 className="bold-18">&#8377;{totalAmount}</h4>
                </div>
              </div>
              {!isAddressModalVisible && (
                <>
                  <button
                    onClick={handleProceedClick}
                    className="btn_dark_rounded !rounded w-44 "
                  >
                    Proceed
                  </button>

                  <div className="flex flex-col gap-10">
                    <h4 className="bold-20 capitalize">
                      Enter your coupon code:
                    </h4>
                    <div className="flexBetween pl-5 h-12 bg-primary rounded-full ring-1 ring-black/60 ">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        className="bg-transparent border-none outline-none"
                      />
                      <button className="btn_dark_rounded">Submit</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <img
              src={Empty}
              width={100}
              height={100}
              className="w-[300px] md:w-[400px] rounded-[500px] mt-[140px] lg:mt-[120px]"
            />
            <span className="text-xl font-bold mt-10">Your cart is empty!</span>

            <span className="text-center mt-4">
              Looks like you have not added anything to your cart.
              <br />
              Explore our collection and choose your pick!
            </span>

            <Link
              to="/"
              className="py-4 px-8 rounded-md font-anta bg-white text-black text-lg font-medium transition-transform active:scale-95 mb-3 mt-6 hover:bg-green-300"
            >
              Back to Pavilion
            </Link>
            {/* Empty cart message end */}
          </div>
        </>
      )}
      {isAddressModalVisible && <AddressModal />}
    </section>
  );
};

export default CartItems;
