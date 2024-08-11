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

            <div className="mb-8 md:mb-0 w-full shadow-lg p-3">
                <div className=" flex justify-between w-full border-b">
                    <span className="flex justify-center items-center gap-2 mb-2">
                        <svg className="svg-icon" viewBox="0 0 20 20">
                            <path
                                fill="none"
                                d="M12.443,9.672c0.203-0.496,0.329-1.052,0.329-1.652c0-1.969-1.241-3.565-2.772-3.565S7.228,6.051,7.228,8.02c0,0.599,0.126,1.156,0.33,1.652c-1.379,0.555-2.31,1.553-2.31,2.704c0,1.75,2.128,3.169,4.753,3.169c2.624,0,4.753-1.419,4.753-3.169C14.753,11.225,13.821,10.227,12.443,9.672z M10,5.247c1.094,0,1.98,1.242,1.98,2.773c0,1.531-0.887,2.772-1.98,2.772S8.02,9.551,8.02,8.02C8.02,6.489,8.906,5.247,10,5.247z M10,14.753c-2.187,0-3.96-1.063-3.96-2.377c0-0.854,0.757-1.596,1.885-2.015c0.508,0.745,1.245,1.224,2.076,1.224s1.567-0.479,2.076-1.224c1.127,0.418,1.885,1.162,1.885,2.015C13.961,13.689,12.188,14.753,10,14.753z M10,0.891c-5.031,0-9.109,4.079-9.109,9.109c0,5.031,4.079,9.109,9.109,9.109c5.031,0,9.109-4.078,9.109-9.109C19.109,4.969,15.031,0.891,10,0.891z M10,18.317c-4.593,0-8.317-3.725-8.317-8.317c0-4.593,3.724-8.317,8.317-8.317c4.593,0,8.317,3.724,8.317,8.317C18.317,14.593,14.593,18.317,10,18.317z"
                            ></path>
                        </svg>
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
                {/* <ul className="mb-0 flex items-center justify-center">
                    <li>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5 text-yellow-500"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </li>
                </ul> */}
            </div>
    );
};

SingleView.propTypes = {
    username : PropTypes.string.isRequired ,
    comment : PropTypes.string.isRequired ,
    date : PropTypes.string.isRequired ,
}
export default Allviews;
