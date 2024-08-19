import { memo } from "react";
import { useDispatch } from "react-redux";
import { incProductPrice , decProductPrice ,removeProduct} from "../../state/shoppingCard";
import propTypes from 'prop-types'
//the products added to the shopping cart
const Cart_products = memo(function Cart_products({ title  , price , id , quantity , imageLink }){
    const dispatch = useDispatch();
    return (
        <li className="flex py-6 shadow-sm">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={imageLink} className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            {title}
                        </h3>
                        <p className="ml-4">{price}DH</p>
                    </div>
                    {/* <p className="mt-1 text-sm text-gray-500">Salmon</p> */}
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500 grid grid-cols-3">
                        <span onClick={()=>{dispatch(decProductPrice({id:id}))}} className="border px-3 py-1 cursor-pointer">-</span>
                        <span className="border px-3 py-1 " >{quantity}</span>
                        <span onClick={()=>{dispatch(incProductPrice({id:id}))}} className="border px-3 py-1 cursor-pointer">+</span>
                    </p>

                    <div className="flex">
                        <button
                            type="button"
                            className="fa-solid fa-trash-can font-meium text-xl text-indigo-600 hover:text-indigo-500 mr-2"
                            onClick={()=>{dispatch(removeProduct({id:id}))}}
                        >
                            
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
});

Cart_products.propTypes = {
    title : propTypes.string,
    price : propTypes.number,
    id : propTypes.string,
    quantity : propTypes.number,
    imageLink : propTypes.string,
}
export default Cart_products;
