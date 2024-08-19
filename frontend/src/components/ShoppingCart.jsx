/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../state/shoppingCard";
import Cart_products from "./product/Cart_products";

const ShoppingCart = () => {
    const { isShown, products, subtotal } = useSelector(
        (state) => state.shopcard
    ); //get the state of the card
    const dispatch = useDispatch();
    //
    return (
        <div className={`relative z-10 ${isShown ? "" : "hidden"}`}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-2">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col   bg-white shadow-xl">
                                <div className="flex-1 overflow-y-scroll  px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2
                                            className="text-lg font-medium text-gray-900"
                                            id="slide-over-title"
                                        >
                                            Shopping cart
                                        </h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                onClick={() => {
                                                    dispatch(hide());
                                                }}
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">
                                                    Close panel
                                                </span>
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul
                                                role="list"
                                                className="-my-6 divide-y divide-gray-200"
                                            >
                                                {products.length > 0 ? (
                                                    products.map((item) => {
                                                        return (
                                                            <Cart_products
                                                                key={item.id}
                                                                title={
                                                                    item.title
                                                                }
                                                                price={
                                                                    item.total
                                                                }
                                                                id={item.id}
                                                                quantity={
                                                                    item.quantity
                                                                }
                                                                imageLink={
                                                                    item.imageLink
                                                                }
                                                            />
                                                        );
                                                    })
                                                ) : (
                                                    <p className="text-3xl font-bold text-gray-400 text-center mt-40">
                                                        No products in the cart
                                                    </p>
                                                )}
                                                {/* More products... */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>{subtotal}DH</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">
                                        Shipping and taxes calculated at
                                        checkout.
                                    </p>
                                    <div className="mt-6">
                                        <a
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
