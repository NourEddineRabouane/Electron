/* eslint-disable react/prop-types */
import { memo, useContext } from "react";
import { modalContext } from "./ManageProducts";

const Table = ({ data }) => {
    
    return (
        <>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="font-semibold text-blue-600 clamp-[xl-3cqw-4xl]">
                    Edit Products
                </h3>
            </div>
            <table className="productsTable min-w-full max-w-full  divide-y mt-6  text-left  ">
                <thead className="bg-gray-500 text-fontDark-primary max-w-full">
                    <tr className="max-w-full">
                        <th
                            scope="col"
                            className="px-5 py-3  text-xs clamp-[xs-2vw-lg] font-medium  uppercase tracking-wider"
                        >
                            Image
                        </th>
                        <th
                            scope="col"
                            className="px-5 py-3  text-xs clamp-[xs-2vw-lg] font-medium  uppercase tracking-wider"
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className="px-5 py-3  text-xs clamp-[xs-2vw-lg] font-medium  uppercase tracking-wider"
                        >
                            Price
                        </th>
                        <th
                            scope="col"
                            className="px-5 py-3  text-xs clamp-[xs-2vw-lg] font-medium  uppercase tracking-wider"
                        >
                            Stock
                        </th>
                        <th
                            scope="col"
                            className="px-5 py-3  text-xs clamp-[xs-2vw-lg] font-medium  uppercase tracking-wider"
                        >
                            Tools
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y   divide-gray-300 overflow-x-scroll max-w-full">
                    {data && <TableBody products={data} />}
                </tbody>
            </table>
        </>
    );
};
const TableBody = memo(function TableBody({ products }) {
    const setLocalModal = useContext(modalContext).setLocalModal;//the local modal for update and delete

    return (
        <>
            {products.map((product) => {
                return (
                    <tr key={product.id} className="max-w-full">
                        <td>
                            <img
                                className="w-[100px]"
                                src={product.imageLink}
                                alt=""
                            />
                        </td>
                        <td className="px-2">{product.title}</td>
                        <td className="px-2">{product.price}</td>
                        <td className="px-2">{product.stock}</td>
                        <td className="flex justify-center items-center gap-4  clamp-[xl-2vw-3xl] h-[100px]">
                            <button
                                className="fa-solid fa-pen text-blue-500 bg-light-primary px-1 sm:px-4 py-2 rounded shadow-sm hover:bg-light-secondary"
                                onClick={() => {
                                    setLocalModal({
                                        type: "update",
                                        title: product.title,
                                        isVisible : true ,
                                        id: product.id,
                                    });
                                }}
                            ></button>
                            <button
                                className="fa-solid fa-trash text-red-500 bg-light-primary px-1 sm:px-4 py-2 rounded shadow-sm hover:bg-light-secondary"
                                onClick={() => {
                                    setLocalModal({
                                        type: "delete",
                                        title: product.title,
                                        isVisible: true,
                                        id: product.id,
                                    });
                                }}
                            ></button>
                        </td>
                    </tr>
                );
            })}
        </>
    );
});

export default Table;
