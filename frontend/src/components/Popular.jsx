import axios from "axios";
import { useEffect, useState } from "react";
import SingleProduct from "./product/SingleProduct";

const Popular = () => {
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get("http://localhost:5000/products/popular", {
                signal: controller.signal,
            })
            .then((res) => {
                setProducts(res.data);
                setError(null);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    const e = err.response?.data?.error || err.message;
                    setError(e);
                    setProducts(null);
                }
            });

        return () => {
            controller.abort();
        };
    }, []);
    if (error)
        return (
            <p className="text-red-500 text-center font-semibold">
                can not fetch popular products :{error}
            </p>
        );
    return (
        <>
            {
                //when data is fetched
                products && (
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {products.map((product) => {
                            return (
                                <SingleProduct
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                )
            }
        </>
    );
};

export default Popular;
