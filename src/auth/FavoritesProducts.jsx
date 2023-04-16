import ProductTable from '../components/ProductTable';
import apiList from '../settings/api_list.json';
import { useEffect, useState } from 'react';
import {Requests} from '../settings/request.js';

export default function FavoriteProducts(){
    const [products, setProducts] = useState([]);
    const [visibleCols, setVisibleCols] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    useEffect(() => {
        Requests.get(`${apiList.base_url}${apiList.favorites}?start=0&length=5`)
        .then((response) => {
            setVisibleCols(response?.data?.visible_cols);
            setProducts(response?.data?.products);
            setProductsCount(response?.data?.items_count);
        });
    }, []);

    return (
        <ProductTable 
            cols={visibleCols}
            data={products}
            entriesCount={productsCount}
            setData={setProducts}
            endpoint={apiList.favorites}
            setEntriesCount={setProductsCount}
        />
    );
}