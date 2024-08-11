import { useEffect, useState, memo, createContext } from "react";
import Add_product from "./Add_product";
import axios from "axios";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalModal } from "../state/modal";
import GlobalModal from "./GloabalModal";
import propTypes from "prop-types"; //to defines props types for components.

export const modalContext = createContext();

const ManageProducts = () => {
    const [data, setData] = useState(null);
    const [product, setProduct] = useState(null);
    const [abortController, setAbortController] = useState(null);
    const [localModal, setLocalModal] = useState({
        type: null,
        title: "",
        id: "",
        isVisible: false,
    });
    const isVisible = useSelector((state) => state.modal.isVisible);
    const dispatchGloabalModal = useDispatch();

    ////handle server responses to manipule the modales to show
    const handleSubmit = (event, type, id) => {
        //when submit the update or delete operaion
        event.preventDefault();
        const controller = new AbortController();
        if (type === "update") {
            axios
                .get(`http://localhost:5000/products/single/${id}`, {
                    signal: controller.signal,
                })
                .then((res) => {
                    setProduct(res.data);
                })
                .catch((err) => {
                    dispatchGloabalModal(
                        setGlobalModal({
                            type: "update",
                            status: "failed",
                            err: err.message,
                        })
                    );
                })
                .finally(() => {
                    controller.abort();
                });
        } else if (type === "delete") {
            axios
                .delete(`http://localhost:5000/products/delete/${id}`, {
                    signal: controller.signal,
                })
                .then((res) => {
                    if (res.status === 200) {
                        dispatchGloabalModal(
                            setGlobalModal({
                                type: "delete",
                                status: "success",
                                err: null,
                            })
                        );
                    }
                })
                .catch((err) => {
                    console.error(err);
                    dispatchGloabalModal(
                        setGlobalModal({
                            type: "delete",
                            status: "failed",
                            err: err.message,
                        })
                    );
                })
                .finally(() => {
                    controller.abort();
                });
        }
        setLocalModal({
            ...localModal,
            isVisible: false,
            type: null,
        }); //when finishing the operation hide the local Modal
    };
    ////
    const handleUpdate = (event, data, image, product) => {
        event.preventDefault();

        // Abort any ongoing request
        if (abortController) abortController.abort();

        const imagePublicId = product.imagePublicId;
        const controller = new AbortController();
        setAbortController(controller);

        // Create form data
        const formData = new FormData();
        formData.append(
            "informations",
            JSON.stringify({ ...data, imagePublicId })
        );
        formData.append("image", image);

        // Send PUT request to update product
        axios
            .put(`http://localhost:5000/admin/update/${product.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                signal: controller.signal,
            })
            .then(() => {
                // Handle success
                dispatchGloabalModal(
                    setGlobalModal({
                        type: "update",
                        status: "success",
                        err: null,
                    })
                );
                setAbortController(null);
            })
            .catch((err) => {
                // Handle error
                if (axios.isCancel(err)) {
                    console.log("Request canceled:", err.message);
                } else {
                    console.error(err);
                    dispatchGloabalModal(
                        setGlobalModal({
                            type: "update",
                            status: "failed",
                            err: err.response.data.error,
                        })
                    );
                }
                setAbortController(null);
            })
            .finally(() => {
                setProduct(null);
                setAbortController(null);
            });
    };

    //once the component is mounted fetch all products from the db
    useEffect(() => {
        axios
            .get("http://localhost:5000/products")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                setData(null);
                dispatchGloabalModal(
                    setGlobalModal({
                        type: "all",
                        status: "failed",
                        err: err.message,
                    })
                );
            });
    }, []);

    return (
        <modalContext.Provider value={{ localModal, setLocalModal }}>
            {/* the section to add a product */}
            <Add_product product={product} handleUpdate={handleUpdate} />

            {/* products in the db */}
            <Table data={data} />

            {/* local modal for updating and deleting a product */}
            {localModal.isVisible && ( //for update and delete
                <Modal
                    dispatch={setLocalModal}
                    modal={localModal}
                    handleSubmit={handleSubmit}
                >
                    {localModal.type === "update"
                        ? `Do you really want to Update :`
                        : `Do you really want to Delete :`}
                </Modal>
            )}

            {/* for the gloabal modal */}
            {isVisible && <GlobalModal />}
        </modalContext.Provider>
    );
};

//modal for delete and update confirmation
const Modal = memo(function Modal({ dispatch, modal, handleSubmit, children }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <div className="mb-4">
                    <p className="text-lg text-gray-800">{`${children} ${modal.title}`}</p>
                </div>
                <div className="flex justify-end space-x-4">
                    <form
                        action=""
                        onSubmit={(e) => handleSubmit(e, modal.type, modal.id)}
                    >
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Confirm
                        </button>
                    </form>
                    <button
                        onClick={() => {
                            dispatch({ //hide the modal
                                ...modal,
                                isVisible: false,
                                type: null,
                            });
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
});
Modal.propTypes = {
    dispatch: propTypes.func,
    modal: propTypes.object,
    handleSubmit: propTypes.func,
    children: propTypes.any,
};
//
export default ManageProducts;
