import React from 'react';
import POPULAR from '../assets/popular';
import Item from './Item';

const RelatedProduct = ({products, category}) => {

  const relatedProducts = products.filter(item => item.category === category).slice(0,4);
  return (
    <section>
        <div className='max_padd_container py-12 xl:pb-28 xl:w-[95%]'>
            <h3 className='text-center font-anta text-white bold-40'>Related Products</h3>
            <hr className=' h-[3px] md:w-1/2 mx-auto mb-16 bg-gradient-to-l from-transparent via-white to-transparent'/>

            {/*  PRODUCT LISTING*/}
            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {relatedProducts.map((item) => (
                    <Item key={item.id} id={item.id} name={item.name} image={item.images[0]} old_price={item.old_price} new_price={item.new_price}/>
                ))}
            </div>
        </div>
    </section>
  )
}

export default RelatedProduct;