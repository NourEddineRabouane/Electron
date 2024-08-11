/* eslint-disable react/prop-types */
import { useEffect, useReducer, useState } from "react";
import reducer from "./reducer";
import axios from "axios";
import GlobalModal from "./GloabalModal";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalModal } from "../state/modal";
//
const Add_product = ({ product, handleUpdate }) => {
    const [data, dispatch] = useReducer(reducer, {
        title: "",
        price: "",
        categorie: "",
        description: "",
        stock: "",
    });
    const [image, setImage] = useState(null); //for the image
    const [abortController, setAbortController] = useState(null); //to control the request

    const isVisible = useSelector((state) => state.modal.isVisible); // Global modal after adding product
    const dispatchGloabalModal = useDispatch();
    //
    const handleImage = (e) => {
        const image = e.target.files[0];
        setImage(image);
    };
    //
    useEffect(() => {
        //if the product to update is available fill its details in the data object to be sent later to the server
        if (product && Object.keys(product).length > 0) {
            dispatch({ type: "title", data: product.title });
            dispatch({ type: "price", data: product.price });
            dispatch({ type: "categorie", data: product.categorie });
            dispatch({ type: "description", data: product.description });
            dispatch({ type: "stock", data: product.stock });
        }
    }, [product]);
    //
    const handleSubmit = (event) => {
        // the handleSubmit function for operatoins that appear when submiting the form.
        event.preventDefault();
        if (abortController) abortController.abort(); //Abort any ongoing request
        const controller = new AbortController();
        setAbortController(controller);
        const formData = new FormData();
        formData.append("informations", JSON.stringify(data));
        formData.append("image", image);

        axios
            .post("http://localhost:5000/admin", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                signal: controller.signal,
            })
            .then(() => {
                dispatchGloabalModal(
                    setGlobalModal({
                        type: "add",
                        status: "success",
                        err: null,
                    })
                );
                setAbortController(null);
            })
            .catch((err) => {
                if (axios.isCancel(err)) {
                    console.log("Request canceled : ", err.message);
                } else {
                    dispatchGloabalModal(
                        setGlobalModal({
                            type: "add",
                            status: "failed",
                            err: err.response.data.error,
                        })
                    );
                    // console.error("Error : ", err);
                }
                //
                setAbortController(null);
            });
    };
    //
    return (
        <div className="relative overflow-y-auto overflow-x-hidden  z-10 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-1 m-auto w-full max-w-full max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="font-semibold text-blue-600 clamp-[xl-3cqw-4xl]">
                            Create New Product
                        </h3>
                    </div>
                    <form
                        className="p-4 md:p-5"
                        onSubmit={(event) => {
                            handleSubmit(event);
                        }}
                    >
                        <div className="grid gap-4 mb-4 grid-cols-2 lg:grid-cols-4 sm:grid-cols-3">
                            <div className="col-span-2">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rimary-500 "
                                    placeholder="Type product name"
                                    required=""
                                    value={data.title}
                                    onChange={(event) =>
                                        dispatch({
                                            type: "title",
                                            data: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]                       "
                                >
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rimary-500 "
                                    placeholder="$2999"
                                    required=""
                                    value={data.price}
                                    onChange={(event) =>
                                        dispatch({
                                            type: "price",
                                            data: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]                       "
                                >
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    value={data.stock}
                                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rimary-500 "
                                    placeholder="999"
                                    required=""
                                    onChange={(event) =>
                                        dispatch({
                                            type: "stock",
                                            data: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-2">
                                <label
                                    htmlFor="category"
                                    className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]"
                                >
                                    Category
                                </label>
                                <select
                                    value={data.categorie}
                                    onChange={(event) =>
                                        dispatch({
                                            type: "categorie",
                                            data: event.target.value,
                                        })
                                    }
                                    id="category"
                                    className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                                >
                                    <option defaultValue="">
                                        Select category
                                    </option>
                                    <option value="TV/Monitors">
                                        TV/Monitors
                                    </option>
                                    <option value="PC">PC</option>
                                    <option value="Gaming/Console">
                                        Gaming/Console
                                    </option>
                                    <option value="Phones">Phones</option>
                                    <option value="Accessory">Accessory</option>
                                    <option value="Kitchen">Kitchen</option>
                                </select>
                            </div>
                            <div className="col-span-2 max-lg:col-span-3">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl] "
                                >
                                    Product Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    className="block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                    placeholder="Write product description here"
                                    onChange={(event) =>
                                        dispatch({
                                            type: "description",
                                            data: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-span-2 max-lg:col-span-3">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]"
                                    htmlFor="file_input"
                                >
                                    Select image
                                </label>
                                <input
                                    className="block px-1 py-2 w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                                    id="file_input"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(event) => handleImage(event)}
                                />
                            </div>
                        </div>
                        {!product && (
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Add new product
                            </button>
                        )}
                        {product && Object.keys(product).length > 0 && (
                            <button
                                onClick={(event) => {
                                    handleUpdate(event, data, image, product);
                                }}
                                type="button"
                                className="inline-flex items-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4"
                            >
                                <svg
                                    className="w-4 h-4 mr-2 -ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Update Product
                            </button>
                        )}
                    </form>
                </div>
            </div>
            {
                // when added a product show the modal

                isVisible && <GlobalModal />
            }
        </div>
    );
};

//
export default Add_product;
