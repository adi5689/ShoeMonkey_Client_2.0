import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Item = ({id, name, image, old_price, new_price}) => {
 
    const discountPercentage = (old_price - new_price) / old_price * 100;

  return (
    <div className='rounded-xl overflow-hidden shadow-lg bg-white'>
        <div className='relative flexCenter group overflow-hidden transition-all duration-100'>
            <Link to={`/product/${id}`} className='h-12 w-12 bg-white rounded-full flexCenter absolute top-1/2 bottom-1/2 scale-0 group-hover:scale-100 !py-2 z-20 transition-all duration-700'>
                <FaSearch className='hover:rotate-90 hover:scale-125 transition-all duration-200'/>
            </Link>
            <img onClick={window.scrollTo(0, 0)} src={image} alt="productImage" className='w-full block object-cover group-hover:scale-110 transition-all duration-1000'/>
        </div>
        <div className='p-4 overflow-hidden'>
            <h4 className='text-black font-anta my-[6px] medium-16 line-clamp-2'>{name}</h4>
            <div className='flexBetween gap-5'>
                <div className='text-black bold-16 font-anta'>&#8377;{new_price}.00</div>
                
                {new_price < old_price && (
                    <>
                        <div className='text-secondary font-anta bold-16 line-through'>&#8377;{old_price}.00</div>
                    </>
                )}
            </div>
            <div className='text-green-600 bold-15 font-anta'>{discountPercentage.toFixed(0)}% Off</div>
        </div>
    </div>
  )
}

export default Item;