import { memo, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./StarRating.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../state/shoppingCard";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { context } from "../App";
//
const Product = () => {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { productId } = useParams();
    useEffect(() => {//once the component is amount fetch the data of the product
        const controller = new AbortController();
        axios
            .get(`http://localhost:5000/products/single/${productId}`, {
                signal: controller.signal,
            })
            .then((res) => {
                setProduct(res.data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setProduct(null);
            });

        return () => {
            //clean up function
            controller.abort();
        };
    }, [productId]);
    return (
        <div className="p-2 md:p-6 relative">
            <Link to="/products">
                <button className="fa-solid fa-arrow-left rounded-full bg-gray-900 hover:bg-gray-700  text-white w-8 h-8 absolute right-2 top-2 z-10"></button>
            </Link>
            <div className="flex items-center justify-center bg-white rounded">
                <div className="flex justify-between w-full">
                    {product && (
                        <OneProduct
                            title={product.title}
                            price={product.price}
                            id={product.id}
                            imageLink={product.imageLink}
                            description={product.description}
                            categorie={product.categorie}
                            stock={product.stock}
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
const OneProduct = ({ title,price,id,imageLink,description,categorie,stock,}) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        //add the product to the cart
        dispatch(
            addProduct({
                id,
                title,
                price,
                total: price, //initialize the total price by the default price
                quantity: 1,
                imageLink,
            })
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
                            <StarRating readOnly={true} productId={id} />
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
//
//
const StarRating = memo(function StarRating({ readOnly, productId, userId }) {
    const [rating, setRating] = useState(0); //number of stars
    const [hover, setHover] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        if (readOnly) {
            //read only the given rate to the product
            axios
                .get(`http://localhost:5000/rating/?productId=${productId}`, {
                    signal: controller.signal,
                })
                .then((res) => {
                    setRating(res.data);
                })
                .catch((err) => {
                    if (!axios.isCancel(err))
                        console.error(err.response.data.error);
                });
        }

        return () => {
            controller.abort();
        };
    }, [productId, readOnly]);
    const handleRate = () => {
        const controller = new AbortController();

        //rate your self the product
        axios
            .put(
                `http://localhost:5000/rating/?productId=${productId}&userId=${userId}`,
                { rating },
                { signal: controller.signal }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) console.log(err);
            });
        return () => {
            controller.abort();
        };
    };
    return (
        <div
            className={` flex  flex-col ${
                !readOnly ? "items-center" : ""
            } gap-4`}
        >
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return readOnly ? (
                        <button
                            type="button"
                            aria-readonly={true}
                            key={index}
                            className={index <= rating ? "on" : "off"}
                        >
                            <span className="star fs-2 text-3xl">&#9733;</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            key={index}
                            className={
                                index <= (hover || rating) ? "on" : "off"
                            }
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star fs-2 text-5xl">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            {//this button will appear only if the user is log in
            !readOnly && (
                <button
                    onClick={handleRate}
                    className="bg-red-400 text-white px-5 py-2 rounded-lg hover:bg-red-500"
                >
                    Rate
                </button>
            )}
        </div>
    );
});

OneProduct.propTypes = {
    //types of props for the OneProduct component
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categorie: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
};
StarRating.propTypes = {
    readOnly: PropTypes.bool.isRequired,
    productId: PropTypes.string,
    userId: PropTypes.string,
};
export default Product;
