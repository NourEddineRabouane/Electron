import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideGlobalModal } from "../state/modal";

const GlobalModal = () => {
    const { isVisible, message, err } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                dispatch(hideGlobalModal());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, dispatch]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-20 inset-0 flex items-end justify-end p-4">
            <div className="bg-blue-500 p-6 max-xsm:px-3 rounded-lg shadow-xl text-center transform transition-transform translate-x-full animate-slide-in-right">
                <div className="text-lg font-medium text-gray-100">
                    {message}
                    {err && <p className="text-red-500 font-bold">: {err}</p>}
                </div>
            </div>
        </div>
    );
};

export default GlobalModal;
