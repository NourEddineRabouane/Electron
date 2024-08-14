import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Allviews = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => { //the first amount of this component ==> get the views from databases
        axios
            .get("http://localhost:5000/view")
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data);
                    setError(null);
                }
            })
            .catch((err) => {
                setData(null);
                setError(err.message);
            });
    }, []);
    return (
        <div className="mt-8 shadow-sm p-4">
            <h1 className="text-gray-700 text-xl font-bold capitalize mb-8">
                others&apos;s views
            </h1>

            {data &&
                    <div className="grid  gap-4 text-center sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
                {data.map((item , index) => {
                    return (
                        <SingleView
                            key={`${item.id}-${index}`}
                            username={item.username}
                            comment={item.comment}
                            date={item.created_at}
                        />
                    );
                })
            }</div>}

            {error && (
                <p className="text-red-500 font-semibold text-center">
                    {error}
                </p>
            )}
        </div>
    );
};
//
const SingleView = ({ username, comment, date }) => {
    const d = new Date(date);
    const day = d.getDate();
    const year = d.getFullYear();
    const month = d.getMonth();
    return (
        <div className="mb-8 md:mb-0 w-full shadow-lg p-3 border rounded">
            <div className=" flex justify-between w-full border-b">
                <span className="flex justify-center items-center gap-2 mb-2">
                    <i className="fa-regular fa-user text-blue-400  p-2  border border-blue-400 rounded-full"></i>

                    <h5 className="capitalize text-xl font-semibold">
                        {username}
                    </h5>
                </span>
                <h6 className=" font-semibold text-primary dark:text-primary-400">
                    {`${day}-${month}-${year}`}
                </h6>
            </div>
            <p className="my-4 text-neutral-600 dark:text-neutral-400">
                <span className="inline-block pe-2 [&>svg]:w-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                    >
                        <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                    </svg>
                </span>
                {comment}
            </p>
        </div>
    );
};

SingleView.propTypes = {
    username : PropTypes.string.isRequired ,
    comment : PropTypes.string.isRequired ,
    date : PropTypes.string.isRequired ,
}
export default Allviews;
