import { useState, useContext } from "react";
import axios from "axios";
import { context } from "../App";
const Reviews = () => {
    const [comment, setComment] = useState("");
    const { info } = useContext(context);

    const handleView = () => {
        const data = JSON.stringify({ comment: comment });
        axios
            .put("", data, { headers: { "Content-Type": "application/json" } })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <div>
            {info.login && (
                <div className="shadow-sm p-4">
                    <h1 className="text-gray-700 text-xl font-bold capitalize">
                        Add your view
                    </h1>
                    <section className="grid grid-cols-2 w-2/3 place-items-center mx-auto max-md:w-full max-sm:grid-rows-2 max-sm:grid-cols-1 mt-4">
                        <textarea
                            onChange={(event) => {
                                setComment(event.target.value);
                            }}
                            className="rounded border px-3 py-2 w-full"
                            name=""
                            id=""
                            placeholder="Write your view..."
                            rows={3}
                        ></textarea>
                        <div className="">
                            <button
                                onClick={handleView}
                                className="rounded bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-500"
                            >
                                <span className="fa-solid fa-add mr-2"></span>
                                Add view
                            </button>
                        </div>
                    </section>
                </div>
            )}
            <div className="mt-8 shadow-sm p-4">
                <h1 className="text-gray-700 text-xl font-bold capitalize">
                    others&apos;s views
                </h1>
            </div>
        </div>
    );
};

export default Reviews;
