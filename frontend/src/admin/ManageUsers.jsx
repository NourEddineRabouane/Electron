import axios from "axios";
import { memo, useEffect, useState, useRef } from "react";
import propTypes from "prop-types";
import Modal from "./LocalModal";
import { useDispatch } from "react-redux";
import { setGlobalModal } from "../state/modal";
import GlobalModal from "./GloabalModal";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [modal, setLocalModal] = useState({
        type: null,
        title: "",
        id: "",
        isVisible: false,
    });
    const dispatch = useDispatch(); // to use the global modal

    // Ref to store the AbortController
    const abortControllerRef = useRef(null);

    const handleSubmit = (e, type, userId) => {
        e.preventDefault();

        // Abort any ongoing request before starting a new one
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create a new AbortController for this request
        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;

        if (type === "delete") {
            axios
                .delete(`http://localhost:5000/users/${userId}`, { signal })
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        dispatch(
                            //show the global modal
                            setGlobalModal({
                                type: "deleteUser",
                                status: "success",
                                err: null,
                            })
                        );
                        setUsers((prevUsers) =>
                            prevUsers.filter((user) => user.id !== userId)
                        ); // Optionally update the UI
                        setGlobalModal({ ...modal, isVisible: false });
                    }
                })
                .catch((err) => {
                    if (!axios.isCancel(err)) {
                        dispatch(
                            setGlobalModal({
                                //show the global modal
                                type: "deleteUser",
                                status: "failed",
                                err: err.response?.data?.error || err.message,
                            })
                        );
                    } else {
                        console.log("Request canceled", err.message);
                    }
                });
        }
    };

    useEffect(() => {
        // Abort any ongoing request before starting a new one
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create a new AbortController for this request
        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;

        axios
            .get("http://localhost:5000/users", { signal })
            .then((res) => {
                if (res.status === 200) {
                    setUsers(res.data);
                    setError(null);
                }
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    setUsers([]);
                    setError(err.response?.data?.err || err.message);
                } else {
                    console.log("Request canceled", err.message);
                }
            });

        // Clean up function to abort the request when the component unmounts
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    if (error)
        return <p className="text-red-500 text-center mx-auto">{error}</p>;

    return (
        <div>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="font-semibold text-blue-600 clamp-[xl-3cqw-4xl]">
                    Users
                </h3>
            </div>

            <Table users={users} setLocalModal={setLocalModal} />
            {modal.isVisible && (
                <Modal
                    dispatch={setLocalModal}
                    modal={modal}
                    handleSubmit={handleSubmit}
                >
                    Do you really want to DELETE:
                </Modal>
            )}
            <GlobalModal />
        </div>
    );
};

const Table = memo(function Table({ users, setLocalModal }) {
    const thStyle = "p-3 font-medium uppercase tracking-wider";
    return (
        <div className="overflow-x-auto max-w-full">
            <table className="min-w-full divide-y mt-6 text-left">
                <thead className="bg-gray-500 text-fontDark-primary text-sm sm:text-md  md:text-lg">
                    <tr>
                        <th scope="col" className={thStyle}>
                            User name
                        </th>
                        <th scope="col" className={thStyle}>
                            Email
                        </th>
                        <th scope="col" className={thStyle}>
                            Sign up date
                        </th>
                        <th scope="col" className={thStyle}>
                            Tools
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b hover:bg-gray-50 transition duration-300 ease-in-out"
                        >
                            <td className="px-4 py-3 font-medium text-gray-700 truncate">
                                {user.username}
                            </td>
                            <td className="px-4 py-3 text-gray-600 truncate">
                                {user.email}
                            </td>
                            <td className="px-4 py-3 text-gray-500">
                                {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="flex justify-center items-center gap-4 h-[100px]">
                                <button
                                    className="fa-solid fa-trash text-red-500 bg-gray-200 px-3 py-2 rounded-full shadow-md hover:bg-red-100 hover:text-red-700 transition duration-200 ease-in-out transform hover:scale-110"
                                    onClick={() => {
                                        setLocalModal({
                                            type: "delete",
                                            title: user.username,
                                            isVisible: true,
                                            id: user.id,
                                        });
                                    }}
                                    title="Delete user"
                                ></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

Table.propTypes = {
    users: propTypes.array || null,
    setLocalModal: propTypes.func,
};
export default ManageUsers;
