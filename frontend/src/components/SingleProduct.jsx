import { useDispatch } from "react-redux";
import { addProduct } from "../state/shoppingCard";
import { Link, useNavigate } from "react-router-dom";

const SingleProduct = ({ title, price, id, imageLink }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        //Send the product to the cart
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
    return (
        <div className="group relative shadow-md border rounded">
            <button
                className="fa-solid fa-bag-shopping bg-gray-900 hover:bg-gray-700 rounded text-white w-7 h-7 absolute right-4 top-4 z-10"
                title="ADD TO CART"
                onClick={handleClick}
            ></button>
            <div className="aspect-h-1  aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 cursor-pointer">
                <Link to={id}>
                    <img
                        id={id}
                        src={imageLink}
                        alt=""
                        className="h-full w-full object-fill object-center lg:h-full lg:w-full"
                    />
                </Link>
            </div>
            <div className="my-4 px-1 pb-1 flex justify-between gap-2">
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                        {title}
                    </h3>
                </div>
                <p className="text-base font-bold text-gray-900">{price}DH</p>
            </div>
        </div>
    );
};

export default SingleProduct;
