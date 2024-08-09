import { Link } from "react-router-dom";
import Animated_div from "../components/Animated_div";
import Popular from "../components/Popular";
import laptop from "../images/laptop.png";
const Home = () => {
    return (
        <section className="">
            <div className="relative w-full max-md:min-h-screen md:max-h-screen bg-[#00baed] p-3 sm:p-6">
                <div className="grid place-items-center grid-cols-2 max-md:grid-cols-1 max-md:grid-rows-2">
                    <div className="relative h-full place-content-center">
                            <i className="absolute animate- animate-pulse top-0 right-0 fa-duotone fa-solid fa-star text-5xl text-yellow-400"></i>
                            <i className="absolute animate- animate-pulse top-0 right-1/2 translate-x-1/2 fa-duotone fa-solid fa-star text-5xl text-yellow-400"></i>
                            <i className="absolute animate- animate-pulse top-0 left-0 fa-duotone fa-solid fa-star text-5xl text-yellow-400"></i>
                        <h1 className="clamp-[6xl-3cqw-8xl] font-extrabold text-white drop-shadow-xl">
                            Electron
                        </h1>
                        <p className="text-3xl sm:text-4xl text-white mt-4 drop-shadow-xl">
                            Get the{" "}
                            <strong className="text-yellow-400 animate-pulse">best</strong>{" "}
                            gadgets at{" "}
                            <strong className="text-yellow-400 animate-pulse">amazing</strong>{" "}
                            prices – only at{" "}
                            <strong className="text-yellow-400 animate-pulse">our</strong>{" "}
                            store!
                        </p>
                    </div>
                    <div className=" text-center w-full">
                        <img
                            className="max-md:max-w-[350px] mx-auto drop-shadow-xl"
                            src={laptop}
                            alt="Laptop"
                        />
                        <Link to='/products'>
                        <button className="bg-white text-[#00baed] font-bold py-2 px-4 rounded-full text-xl hover:bg-gray-200 transition">
                            Shop Now
                        </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="shadow-lg mb-4">
                <h2 className="clamp-[3xl-3vw-5xl] m-5 flex  border-b text-gray-600">
                    Our offres :
                </h2>
                <Animated_div />
            </div>

            <Popular />
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Adipisci fugiat in vitae dolores tempora illum expedita quam,
                recusandae odio laborum totam excepturi eius, magnam aliquam
                atque explicabo quia labore porro.
            </p>
        </section>
    );
};

export default Home;