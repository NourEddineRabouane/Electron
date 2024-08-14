import { useState, useContext } from "react";
import axios from "axios";
import Allviews from "../components/Allviews";
import context from "../Context/AppContext";

const Reviews = () => {
    const [comment, setComment] = useState("");
    const { info } = useContext(context);

    const handleView = () => {
        const data = JSON.stringify({ comment: comment, id: info.id });
        axios
            .put("http://localhost:5000/view", data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setComment('');
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <div className="border ">
            {info.login && (
                <div className="shadow-sm p-4">
                    <h1 className="text-gray-700 text-xl font-bold capitalize">
                        Add your view
                    </h1>
                    <section className="grid grid-cols-2 w-2/3 place-items-center mx-auto max-md:w-full max-sm:grid-rows-2 max-sm:grid-cols-1 mt-4">
                        <textarea
                        value={comment}
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
            
            <Allviews/>
        </div>
    );
};

export default Reviews;
