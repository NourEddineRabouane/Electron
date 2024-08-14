/* eslint-disable react/prop-types */
import { useEffect, useReducer, useState } from "react";
import reducer from "./reducer";
import axios from "axios";
import GlobalModal from "./GloabalModal";
import { useDispatch } from "react-redux";
import { setGlobalModal } from "../state/modal";
import FormBody from "./FormBody";
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
    const dispatchGloabalModal = useDispatch(); //to show the global modal when it is needed
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
                        <FormBody data={data} dispatch={dispatch} handleImage={handleImage} />
                        {
                        product && Object.keys(product).length > 0 ? (
                            <button
                                onClick={(event) => {
                                    handleUpdate(event, data, image, product);
                                }}
                                type="button"
                                className="inline-flex items-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4"
                            >
                                <i className="fa-solid fa-edit mr-2"></i>
                                Update Product
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                            <i className="fa-solid fa-plus mr-2"></i>
                                Add new product
                            </button>
                        )}
                    </form>
                </div>
            </div>
            { /* when added a product show the modal*/}
            <GlobalModal />
        </div>
    );
};

export default Add_product;
