import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Item from '../components/Item';
import { useProducts } from '../hooks/useProducts';

const Category = ({ category, banner }) => {
 const { products, status, error, loadProducts } = useProducts();
 const [sortOption, setSortOption] = useState('default'); // Default sorting option

 useEffect(() => {
    if (status === 'idle') {
      loadProducts();
    }
 }, [status, loadProducts]);

 if (status === 'loading') return <div>Loading...</div>;
 if (status === 'failed') return <div>{error}</div>;

 let filteredProducts = products.filter((product) => product.category === category);

 // Sorting logic
 if (sortOption === 'priceLowToHigh') {
    filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(a.new_price) - parseFloat(b.new_price));
 } else if (sortOption === 'priceHighToLow') {
    filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(b.new_price) - parseFloat(a.new_price));
 }

 const totalProducts = filteredProducts.length;
 const startCount = 1; // Assuming you want to start counting from 1
 const endCount = totalProducts; // This will be the total count of products in the category

 return (
    <section className="pt-[100px] bg-gradient-to-r font-anta from-black via-purple-900 to-black max_padd_container py-12 xl:py-28">
      <div>
        <div>
          <img
            src={banner}
            alt="banner_img"
            className="block mb-7 mx-auto object-cover object-center"
          />
        </div>
        <div className="flexBetween my-8 mx-2">
          <h5 className="text-white font-bold"><span>Showing {startCount}-{endCount} out of {totalProducts} products</span></h5>
          <div className="text-white flexBetween max-sm:p-4 gap-x-4 px-8 py-3 rounded-5xl ring-1 ring-white/60">
            <select className="text-white bg-transparent w-[20px]" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option className='text-black' value="default">Default</option>
              <option className='text-black' value="priceLowToHigh">Price: Low to High</option>
              <option className='text-black' value="priceHighToLow">Price: High to Low</option>
            </select>
            Sort by 
          </div>
        </div>

        {/* CONTAINER */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <Item key={item.id} id={item.id} name={item.name} image={item.images[0]} category={category} old_price={item.old_price} new_price={item.new_price}/>
          ))}
        </div>
        {/* <div className="mt-16 text-center">
          <button className="btn_white_rounded">Load more</button>
        </div> */}
      </div>
    </section>
 );
};

export default Category;
