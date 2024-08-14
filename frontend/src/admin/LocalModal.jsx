import {memo} from 'react';
import propTypes from 'prop-types';


//modal for delete and update confirmation
const Modal = memo(function Modal({ dispatch , modal, handleSubmit, children }) {
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
                            dispatch({
                                //hide the modal
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
export default Modal;