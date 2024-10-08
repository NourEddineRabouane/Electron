import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [data, setData] = useState({ email: "", password: "", username: "" });
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:5000/signup", data)
            .then((res) => {
                if (res.status === 200) navigate("/login");
            })
            .catch((err) => console.error(err));
    };
    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create new account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="demo123"
                                    required
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="name@company.com"
                                    required
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    required
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-fontDark-thirdly bg-blue-600 focus:ring-4 focus:outline-none focus:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                Sign up
                            </button>
                            <p className="text-sm font-light text-gray-500 ">
                                I have an account .{" "}
                                <Link
                                    to={"/login"}
                                    className="font-medium text-[#2563eb] hover:underline "
                                >
                                    Log in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
