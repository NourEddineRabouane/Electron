import personalDev from "../images/personaldevices.jpeg";
import electronicDev from "../images/electronicDev.jpg";
import kitchenDev from "../images/kitchendevices.png";
import { Link } from "react-router-dom";

function HomeSection() {
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
                    <div className="sm:text-left ">
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
                <div className="grid shadow-sm sm:grid-col-2 grid-cols-1 gap-4 max-sm:grid-rows-2 place-items-center sm:grid-cols-2 sm:flex sm:flex-row-reverse sm:justify-between">
                    <div className="sm:flex-grow-0 sm:w-1/2 w-full">
                        <img
                            className="object-cover w-full h-auto rounded-lg shadow-lg max-h-[334px]"
                            src={kitchenDev}
                            alt="Kitchen Device"
                        />
                    </div>
                    <div className="sm:text-left sm:flex-grow-0 sm:w-1/2 ">
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
                    <div className=" sm:text-left ">
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
        </>
    );
}

export default HomeSection;
