import PropTypes from "prop-types";
import "./StarRating.css";
import { useContext  } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../state/shoppingCard"; //add product to the cart
import { Link, useParams } from "react-router-dom";
import useProduct from "../fetch/useProduct";
import StarRating from "./StarRating";
import context from "../Context/AppContext";
//
const Product = () => {
    const { productId } = useParams();
    const { product , error } = useProduct(productId);

    return (
        <div className="p-2 md:p-6 relative">
            <Link to="/products">
                <button className="fa-solid fa-arrow-left rounded-full bg-gray-900 hover:bg-gray-700  text-white w-8 h-8 absolute right-2 top-2 z-10"></button>
            </Link>
            <div className="flex items-center justify-center bg-white rounded">
                <div className="flex justify-between w-full">
                    {product && (
                        <OneProduct
                            product={product}
                        />
                    )}
                    {error && (
                        <p className="text-red-500 font-semibold text-lg">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
//
//
const OneProduct = ({product}) => {
    const { title,price,id,imageLink,description,categorie,stock,rating} = product;
    const dispatch = useDispatch();
    const handleClick = () => {
        //add the product to the cart
        dispatch(
            addProduct({id,title, price,total: price, /*initialize the total price by the default price*/ quantity: 1,imageLink,})
        );
    };
    const { info } = useContext(context);//get the details of the user
    return (
        <section className="shadow-lg w-full">
            <div className="w-full mx-auto">
                <div className="grid grid-cols-1 max-md:px-4 md:grid-cols-2 gap-4 mx-auto">
                    <div className="">
                        <div className="relative  w-full  h-full max-md:mx-auto max-w-md ">
                            <button
                                className="fa-solid fa-bag-shopping bg-gray-900 hover:bg-gray-700 rounded text-white w-7 h-7 md:w-9 md:h-9 absolute left-3 top-3 z-10"
                                title="ADD TO CART"
                                onClick={handleClick}
                            ></button>
                            <img
                                src={imageLink}
                                alt={title}
                                className="max-lg:mx-auto lg:ml-auto  aspect-1 max-md:rounded-md"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:pr-8 pr-1 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                        <div className=" w-full max-w-xl">
                            <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">
                                {categorie}
                            </p>
                            <StarRating readOnly={true} productId={id} Rating={rating} />
                            <h2 className=" font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                                {title}
                            </h2>
                            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                <h6 className=" font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                    {price} DH
                                </h6>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`font-semibold ${
                                            stock > 0
                                                ? "text-green-600"
                                                : "text-red-600 line-through"
                                        }`}
                                    >
                                        Available
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-base font-normal mb-5">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
                    {info.login && (
                <div className="p-10 text-center border-t">
                    <p className="text-gray-500 capitalize text-lg md:text-xl lg:text-2xl">
                        Rate Product now
                    </p>
                        <StarRating
                            readOnly={false}
                            userId={info.id}
                            productId={id}
                        />
                </div>
                    )}
            </div>
        </section>
    );
};

//types of props for the OneProduct component
OneProduct.propTypes = {
    product : PropTypes.object.isRequired,
};

export default Product;
