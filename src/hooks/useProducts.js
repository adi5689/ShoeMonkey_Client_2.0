import {useSelector, useDispatch} from 'react-redux';
import { fetchProducts, fetchProductById } from '../features/products/productsSlice';

export const useProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const singleProduct = useSelector((state) => state.products.singleProduct);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    const loadProducts = () => {
        dispatch(fetchProducts());
    };

    const loadProductById = (productId) => {
        dispatch(fetchProductById(productId));
    }

    return {products, singleProduct, status, error, loadProducts, loadProductById};
};