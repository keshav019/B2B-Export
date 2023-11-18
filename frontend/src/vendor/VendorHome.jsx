import { Link } from "react-router-dom";
import ProductCard from "../globalComponents/ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import Error from "../globalComponents/Error";
import { useEffect } from "react";
import { getProducts } from "../store/actions/vendorAction";
const VendorHome = () => {
    const { loading, error, products } = useSelector(state => state.vendor);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts({}));
    }, [dispatch])
    return (
        <div className="min-h-screen md:container mx-auto mt-10 p-6">
            {!loading && error && <Error message={error} />}
            {!loading && products.length === 0 &&
                <div className="bg-green-200 p-4 rounded-md text-center">
                    <p className="text-green-800">
                        No product added <Link to="/vendor/product/add" className="text-blue-500 underline">Add Product</Link>
                    </p>
                </div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (<ProductCard key={product._id} product={product} />))}
            </div>
        </div>)
}
export default VendorHome;