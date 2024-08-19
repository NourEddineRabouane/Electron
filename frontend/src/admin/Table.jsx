import propTypes from "prop-types";
import { useContext } from "react";
import modalContext from "../Context/modalContext";

const Table = ({ data }) => {
    const setLocalModal = useContext(modalContext).setLocalModal; //the local modal for update and delete
    const thStyle = "py-4 font-semibold uppercase tracking-wider";
    return (
        <>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="font-semibold text-blue-600 clamp-[xl-3cqw-4xl]">
                    Edit Products
                </h3>
            </div>
            <div className="overflow-x-auto max-w-full">
                <table className="productsTable min-w-full max-w-full divide-y mt-6 text-left border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm sm:text-md  md:text-lg">
                        <tr>
                            <th scope="col" className={thStyle}>
                                Image
                            </th>
                            <th scope="col" className={thStyle}>
                                Title
                            </th>
                            <th scope="col" className={thStyle}>
                                Price
                            </th>
                            <th scope="col" className={thStyle}>
                                Stock
                            </th>
                            <th scope="col" className={thStyle}>
                                Tools
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {data &&
                            data.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-gray-100 transition-colors"
                                >
                                    <td className="p-4">
                                        <img
                                            className="w-[100px] h-auto object-cover rounded-lg shadow-md"
                                            src={product.imageLink}
                                            alt={product.title}
                                        />
                                    </td>
                                    <td className="p-4 text-gray-700 font-medium">
                                        {product.title}
                                    </td>
                                    <td className="p-4 text-gray-700 font-medium">
                                        ${product.price}
                                    </td>
                                    <td className="p-4 text-gray-700 font-medium">
                                        {product.stock}
                                    </td>
                                    <td className="p-4">
                                        <div className="p-4 flex justify-center items-center h-full gap-4">
                                            <button
                                                className="fa-solid fa-pen text-blue-600 bg-blue-100 p-2 rounded-full shadow hover:bg-blue-200 transition"
                                                onClick={() => {
                                                    setLocalModal({
                                                        type: "update",
                                                        title: product.title,
                                                        isVisible: true,
                                                        id: product.id,
                                                    });
                                                }}
                                            ></button>
                                            <button
                                                className="fa-solid fa-trash text-red-600 bg-red-100 p-2 rounded-full shadow hover:bg-red-200 transition"
                                                onClick={() => {
                                                    setLocalModal({
                                                        type: "delete",
                                                        title: product.title,
                                                        isVisible: true,
                                                        id: product.id,
                                                    });
                                                }}
                                            ></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
Table.propTypes = {
    data: propTypes.array || null,
};
export default Table;
