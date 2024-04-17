import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductHd from '../components/ProductHd';
import ProductDisplay from '../components/ProductDisplay';
import ProductDescription from '../components/ProductDescription';
import RelatedProduct from '../components/RelatedProduct';
import { useSelector } from 'react-redux';
import { useProducts } from '../hooks/useProducts';




const Product = () => {
  const {productId} = useParams();
  const {products, singleProduct, status, error, loadProductById, loadProducts} = useProducts();

  useEffect(() => {
    if (status === 'idle') {
      loadProducts();
    }
 }, [status, loadProducts])

  useEffect(() => {
    if(productId){
      loadProductById(productId);
    }
  }, [productId]);


  if(status === 'loading...') return <div>Loading...</div>;
  if(status === 'failed') return <div>Error: {error}</div>;

  return (
    <section className='pt-[112px] pb-[50px] max_padd_container bg-gradient-to-r from-black via-purple-900 to-black'>
      <div>
        <ProductHd product={singleProduct}/>
        <ProductDisplay product={singleProduct}/>
        <ProductDescription product={singleProduct}/>
        <RelatedProduct products={products} category={singleProduct.category}/>
      </div>
    </section>
  )
}

export default Product;