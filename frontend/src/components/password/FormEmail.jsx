import React from 'react';
import propTypes from 'prop-types'

const FormEmail = React.memo(function Formcode({ handleSubmitEmail , setEmail }) {
  return (
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitEmail}>
          <div>
              <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-gray-700 "
              >
                  Type your email here
              </label>
              <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                  onChange={(e) => {
                      setEmail(e.target.value);
                  }}
              />
          </div>
          <button
              type="submit"
              className="w-full text-fontDark-thirdly bg-teal-700 focus:ring-4 focus:outline-none hover:bg-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
              Send code
          </button>
      </form>
  );
})
FormEmail.propTypes = {
    handleSubmitEmail : propTypes.func ,
    setEmail : propTypes.func
}
export default FormEmail