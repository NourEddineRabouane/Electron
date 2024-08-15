import axios from 'axios';
import  { useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';

const FormPass = ({userId}) => {
    const [password, setPassword] = useState({ pass: null, confirm: null }); //new password
    const [error , setError ] = useState(null);
    
    const Navigate = useNavigate();

    const handlePassword = (event) => {
         event.preventDefault();

         if (password.pass === password.confirm)
            {setError(null);
                const newPassword = {newPassword : password.pass} ;
             axios
                 .post(
                     `http://localhost:5000/forget/change/${userId}`,
                     newPassword
                 )
                 .then((res) => {
                    if (res.status === 200)
                        Navigate('/login')
                 })
                 .catch((err) => {
                     setError(err.response.data.error);
                 });}
         else setError("Cofirm password incorrect");
     };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handlePassword}>
            <div>
                <label
                    htmlFor="pass"
                    className="block mb-2 text-sm font-semibold text-gray-700 "
                >
                    New password
                </label>
                <input
                    type="password"
                    name="pass"
                    id="pass"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="********"
                    required
                    onChange={(e) => {
                        setPassword({ ...password, pass: e.target.value });
                    }}
                />
            </div>
            <div>
                <label
                    htmlFor="confirm"
                    className="block mb-2 text-sm font-semibold text-gray-700 "
                >
                    Confirm new password
                </label>
                <input
                    type="password"
                    name="pass"
                    id="confirm"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="********"
                    required
                    onChange={(e) => {
                        setPassword({ ...password, confirm: e.target.value });
                    }}
                />
            </div>
            {error && ( //the code is incorrect
                <p className="text-red-500 font-semibold text-lg">{error}</p>
            )}
            <button
                type="submit"
                className="w-full text-fontDark-thirdly bg-teal-700 focus:ring-4 focus:outline-none hover:bg-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
                Submit code
            </button>
        </form>
    );
}

FormPass.propTypes = {
    userId : propTypes.string || null ,
}
export default FormPass