import personalDev from "../images/personalDev.png";
import electronicDev from "../images/electronicDev.jpg";
import kitchenDev from "../images/kitchenDev.jpg";
import { Link } from "react-router-dom";

function Animated_div() {
    return (
        <>
            <div className="grid grid-rows-3 gap-8 p-4">
                <div className="grid shadow-sm grid-cols-1 gap-4 max-sm:grid-rows-2 place-items-center sm:grid-cols-2">
                    <div>
                        <img
                            className="object-cover w-full h-auto rounded-lg shadow-lg"
                            src={electronicDev}
                            alt="Electronic Device"
                        />
                    </div>
                    <div className="sm:text-left">
                        <h3 className="clamp-[19px-4cqw-3xl] font-bold">
                            Find out electronic devices
                        </h3>
                        <p className="text-lg font-medium text-gray-700 clamp-[14px-3cqw-18px]">
                            Enhance your entertainment and productivity with our
                            range of cutting-edge electronic devices. From
                            high-definition TVs to versatile laptops, we offer
                            the latest technology to keep you connected and
                            entertained.
                        </p>
                    </div>
                </div>
                <div className="grid shadow-sm sm:grid-col-r grid-cols-1 gap-4 max-sm:grid-rows-2 place-items-center sm:grid-cols-2 sm:flex sm:flex-row-reverse sm:justify-between">
                    <div className="sm:flex-grow-0 sm:w-1/2">
                        <img
                            className="object-cover w-full h-auto rounded-lg shadow-lg"
                            src={kitchenDev}
                            alt="Kitchen Device"
                        />
                    </div>
                    <div className="sm:text-left sm:flex-grow-0 sm:w-1/2">
                        <h3 className="clamp-[xl-3cqw-3xl] font-bold">
                            Find out kitchen electronic devices
                        </h3>
                        <p className="text-lg font-medium text-gray-700">
                            Transform your culinary experience with our kitchen
                            electronics. Our efficient microwaves, blenders, and
                            electric stoves make cooking easier, faster, and
                            more enjoyable.
                        </p>
                    </div>
                </div>
                <div className="grid shadow-sm grid-cols-1 gap-4 max-sm:grid-rows-2 place-items-center sm:grid-cols-2">
                    <div>
                        <img
                            className="object-cover w-full h-auto rounded-lg shadow-lg"
                            src={personalDev}
                            alt="Personal Device"
                        />
                    </div>
                    <div className=" sm:text-left">
                        <h3 className="clamp-[lg-3cqw-3xl] font-bold">
                            Find out personal electronic devices
                        </h3>
                        <p className="text-lg font-medium text-gray-700">
                            Stay connected and organized with our personal
                            electronic devices. Whether it&apos;s a smartphone,
                            smartwatch, or tablet, we have the perfect gadgets
                            to enhance your daily life.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full text-center p-2">
                <Link to={"/products"}>
                    <button className=" py-2 px-4 bg-blue-500 text-white hover:bg-blue-400 rounded flex items-center gap-4 justify-center mx-auto shadow-lg">
                        <span className="uppercase">check products now</span>
                        <span className="fa-solid fa-arrow-right"></span>
                    </button>
                </Link>
            </div>
            {/*<div className="relative w-full flex min-h-[60vh] overflow-hidden">
            <div className={`absolute  w-full h-full animate-slide-1 pb-4 sm:p-0 flex flex-col sm:flex-row gap-4 justify-between  overflow-hidden`}>
                <img src={electronicDev}
                    alt=""
                    className=" min-[365]:h-[70%] max-sm:h-[80%] sm:w-[450px] lg:w-auto"
                />
                <p className="max-[365px]:text-2xl min-[365px]:text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Find out electronic devices
                </p>
            </div>
            <div
                className={`absolute  w-full h-full animate-slide-2 pb-4 sm:p-0 flex flex-col sm:flex-row gap-4 justify-between  overflow-hidden`}
            >
                <img
                    src={personalDev}
                    alt=""
                    className=" min-[365]:h-[70%] max-sm:h-[80%] sm:w-[450px] lg:w-auto"
                />
                <p className="max-[365px]:text-2xl min-[365px]:text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Find out new personal electronic devices
                </p>
            </div>
            <div
                className={`absolute  w-full h-full animate-slide-3 pb-4 sm:p-0 flex flex-col sm:flex-row gap-4 justify-between  overflow-hidden`}
            >
                <img
                    src={kitchenDev}
                    alt=""
                    className=" min-[365]:h-[70%] max-sm:h-[80%] sm:w-[450px] lg:w-auto"
                />
                <p className="max-[365px]:text-2xl min-[365px]:text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Find out new kitchen electronic devices
                </p>
            </div>
        </div>*/}
        </>
    );
}

export default Animated_div;
