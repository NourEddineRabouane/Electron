import { useState } from "react";
import SingleProduct from "../components/product/SingleProduct";
import useProducts from "../fetch/useProducts";
import { Outlet } from "react-router-dom";
//
//all products component
const Products = () => {
    //
    const [search, setSearch] = useState(null);
    const [operation, setOperation] = useState({ type: "all", content: "", });
    //
    const [products, isPending, error] = useProducts(operation);
    //
    const handleSubmit = (event) => {
        event.preventDefault();
        setOperation({ type: "specific", content: search});
    };
    //
    const handleFilter = (event) => {
        const value = event.target.value;
        setOperation({ type: "filter",  content: value });
    };
    //
    return (
        <>
            <div className="rounded overflow-hidden shadow-md mt-8">
                <form action="" onSubmit={handleSubmit} className="text-xl">
                    <div className="grid  grid-row-2 xsm:grid-cols-3 xsm:grid-row-1 overflow-hidden border">
                        <select
                            className="text-center py-4 text-gray-800"
                            onChange={(event) => handleFilter(event)}
                        >
                            <option value="">Filter by category</option>
                            <option value="TV/Monitors">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="Gaming/Console">
                                Gaming/Console
                            </option>
                            <option value="Phones">Phones</option>
                            <option value="Accessory">Accessory</option>
                            <option value="Kitchen">Kitchen</option>
                        </select>
                        <div className="flex xsm:col-span-2 ">
                            <div className="w-full ">
                                <input
                                    required
                                    className="px-2 py-5 w-full outline-none"
                                    type="search"
                                    placeholder="search for itmes..."
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="fa-solid fa-magnifying-glass px-6 text-white bg-[#f3a847] hover:opacity-75 rounded"
                            ></button>
                        </div>
                    </div>
                </form>

                {/* products */}
                <div className="">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="clamp-[3xl-3cqw-5xl] font-bold tracking-tight text-blue-600">
                            Products
                        </h2>
                        {
                            //when data hasn't been fetched yet
                            isPending && (
                                <h1 className="text-3xl text-center">
                                    Loading...
                                </h1>
                            )
                        }
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
                        {
                            //when error appear
                            !products && error && (
                                <p className="text-red-600 text-center text-xl mt-4">
                                    {error}
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Products;
