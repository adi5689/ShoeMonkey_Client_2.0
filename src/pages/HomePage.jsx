import React, {useEffect} from "react";
import HeroBanner from "../components/HeroBanner";
import Popular from "../components/Popular";
import Offer from "../components/Offer";
import NewCollection from "../components/NewCollection";
import NewsLetter from "../components/NewsLetter";
import { useProducts } from "../hooks/useProducts";


const HomePage = () => {
  const {products, status, error, loadProducts} = useProducts();

  useEffect(() => {
    if (status === 'idle') {
      loadProducts();
    }
 }, [status, loadProducts])

  return (
    <div className="pt-[112px] font-anta bg-gradient-to-r from-black via-purple-900 to-black">
      <HeroBanner />

      {/* TAGLINE */}
      <div className="w-full max-w-[1280px] px-5 md:px-10 mx-auto">
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[22px] md:text-[26px] mb-5 leading-tight font-anta text-white">
            Like a Drug Store, <br /> To all the Sneaker Junkies out there!
          </div>
          <div className="text-[16px] font-anta md:text-[16px] text-white">
            Select your kind of dose, from Air Jordans to Chuck Taylors, from
            NMD's to Air Force 1's, we got it all covered.
          </div>
        </div>
      </div>

      {/* POPULAR PRODUCTS */}
      <Popular products={products} status={status}  error={error}/>
      <Offer />
      <NewCollection products={products} status={status}  error={error}/>
      <NewsLetter />
    </div>
  );
};

export default HomePage;
