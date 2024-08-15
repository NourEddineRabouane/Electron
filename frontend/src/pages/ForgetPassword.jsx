import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormEmail from "../components/password/FormEmail";
import Formcode from "../components/password/Formcode";
import FormPass from "../components/password/FormPass";
const ForgetPassword = () => {
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);
    const [data, setdata] = useState({ verificationCode: null, userId: null });

    const [topassword, setToPassword] = useState(false); //flag to show the inputs for setting new passwords
    const handleSubmitEmail = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:5000/forget", { email })
            .then((res) => {
                if (res.status < 300) {
                    setdata({
                        verificationCode: res.data.verificationCode,
                        userId: res.data.userId,
                    });
                    setError(null);
                }
            })
            .catch((err) => {
                if (err.response.status >= 400 && err.response.status < 500)
                    setError(err.response.data.error); //
                else console.error(err);
            });
    };

    if (error)
        //the email not found
        return (
            <div className="  w-full h-[50vh] flex justify-center items-center">
                <p className="text-red-500 font-semibold text-lg">{error}</p>
                <Link to="/signup" className="underline text-blue-400 mx-4">
                    Sign up
                </Link>
            </div>
        );
    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[50vh] lg:py-0">
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        {!data.verificationCode ? (
                            <FormEmail
                                handleSubmitEmail={handleSubmitEmail}
                                setEmail={setEmail}
                            />
                        ) : topassword ? (
                            <FormPass userId={data.userId} />
                        ) : (
                            <Formcode
                                verificationCode={data.verificationCode}
                                setToPassword={setToPassword}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

ForgetPassword.propTypes = {};

export default ForgetPassword;
