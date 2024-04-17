import React, { useContext, useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ProductImageViewer from "./ImageViewer";
import SizeSelector from "./SizeSelector";
import {
  selectIsLoggedIn,
  selectLoggedInUserEmail,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { addToCartAsync, fetchCartDataAsync } from "../features/cart/cartSlice";



const ProductDisplay = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const userEmail = useSelector(selectLoggedInUserEmail);


  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage("Please select a size before adding to cart.");
      toast.error("Please select a size before adding to cart.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!isLoggedIn) {
      // Redirect to login page if user is not logged in
      navigate("/login", {
        state: {
          redirectTo: "/cart",
          productToAdd: {
            email: userEmail,
            productId: product.id,
            name: product.name,
            size: selectedSize,
            price: product.new_price,
            quantity: 1,
            images: product.images,
          },
        },
      });
      return; // Exit the function early
    }
    dispatch(
      addToCartAsync({
        email: userEmail,
        productId: product.id,
        quantity: 1,
        size: selectedSize,
      })
    );
    setTimeout(() => {
      dispatch(fetchCartDataAsync());
   }, 1000);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  const discountPercentage =
    ((product.old_price - product.new_price) / product.old_price) * 100;

  return (
    <section className="pt-10 md:py-0">
      <div className="flex flex-col gap-14 xl:flex-row">
        {/* LEFT SECTION */}
        {product.images && product.images.length > 0 && (
          <ProductImageViewer images={product.images} />
        )}

        {/* RIGHT SECTION */}
        <div className="flex flex-col lg:w-3/5">
          <h3 className="h3 mb-0 text-white font-trucu">{product.name}</h3>
          <p className="text-white">
            <span className="medium-16 text-[#fff9f9]">Category :</span>{" "}
            {product.category}
          </p>
          <div className="flex gap-x-1 text-secondary medium-22">
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
            <MdStar />
            <p className="text-white">(89)</p>
          </div>
          <div className="flex text-[#00ff00] gap-x-2 medium-20 my-4">
            {product.new_price < product.old_price ? (
              <>
                MRP:
                <div className="text-white">&#8377;{product.new_price}</div>
                <div className="line-through text-white/80">
                  &#8377;{product.old_price}
                </div>
                <p className="flex justify-center items-center text-[#ff5050]">
                  ({discountPercentage.toFixed(0)}% Off)
                </p>
              </>
            ) : (
              <>
                MRP:
                <div className="text-white">&#8377;{product.new_price}</div>
              </>
            )}
          </div>

          {/* SIZE SECTION */}
          <div className="mb-4">
            {product.sizes && product.sizes.length > 0 && (
              <SizeSelector
                onSizeSelected={setSelectedSize}
                setErrorMessage={setErrorMessage}
                sizes={product.sizes}
              />
            )}
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}

            <div className="flex flex-col gap-y-3 mb-4 max-w-[555px]">
              <button
                onClick={handleAddToCart}
                // disabled={!selectedSize}
                className="btn_light_outline !rounded hover:bg-green-300 hover:text-black hover:border-black uppercase regular-14 font-anta tracking-widest"
              >
                Add to Cart
              </button>
              <button className="btn_outline !rounded hover:bg-orange-500 hover:text-black hover:border-black uppercase regular-14 font-anta tracking-widest">
                Buy it now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
