import React, { useState } from "react";
import propTypes from "prop-types";

const Formcode = React.memo(function Formcode({verificationCode, setToPassword}) {
    const [code, setCode] = useState(null); //code typed by user
    const [error, setError] = useState(null); //errors

    const handleSubmitCode = (event) => {
        event.preventDefault();
        if (code === verificationCode) {
            //given code is correct
            setToPassword(true);
        } else {
            setError("Code incorrect , try Again!");
        }
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitCode}>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-gray-700 "
                >
                    Virification code was sent to your email
                </label>
                <input
                    type="text"
                    name="code"
                    id="code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="XXXXXX"
                    required
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                />
            </div>
            {error && ( //the code is incorrect
                <p className="text-red-500 font-semibold text-lg">{error}</p>
            )}
            <button className="w-full text-fontDark-thirdly bg-teal-700 focus:ring-4 focus:outline-none hover:bg-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                Submit code
            </button>
        </form>
    );
});

Formcode.propTypes = {
    verificationCode: propTypes.string || null,
    setToPassword: propTypes.func,
};
export default Formcode;
