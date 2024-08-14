import React from 'react'
import propTypes from 'prop-types';

const FormBody = React.memo(function FormBody ({data , dispatch , handleImage }) {
  return (
          <div className="grid gap-4 mb-4 grid-cols-2 lg:grid-cols-4 sm:grid-cols-3">
              <div className="col-span-2">
                  <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]"
                  >
                      Title
                  </label>
                  <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rimary-500 "
                      placeholder="Type product name"
                      required=""
                      value={data.title}
                      onChange={(event) =>
                          dispatch({
                              type: "title",
                              data: event.target.value,
                          })
                      }
                  />
              </div>
              <div className="col-span-2 sm:col-span-1">
                  <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]                       "
                  >
                      Price
                  </label>
                  <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rimary-500 "
                      placeholder="$2999"
                      required=""
                      value={data.price}
                      onChange={(event) =>
                          dispatch({
                              type: "price",
                              data: event.target.value,
                          })
                      }
                  />
              </div>
              <div className="col-span-2 sm:col-span-1">
                  <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]                       "
                  >
                      Stock
                  </label>
                  <input
                      type="number"
                      name="stock"
                      id="stock"
                      value={data.stock}
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 rimary-500 "
                      placeholder="999"
                      required=""
                      onChange={(event) =>
                          dispatch({
                              type: "stock",
                              data: event.target.value,
                          })
                      }
                  />
              </div>
              <div className="col-span-2 sm:col-span-2">
                  <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]"
                  >
                      Category
                  </label>
                  <select
                      value={data.categorie}
                      onChange={(event) =>
                          dispatch({
                              type: "categorie",
                              data: event.target.value,
                          })
                      }
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  >
                      <option defaultValue="">Select category</option>
                      <option value="TV/Monitors">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="Gaming/Console">Gaming/Console</option>
                      <option value="Phones">Phones</option>
                      <option value="Accessory">Accessory</option>
                      <option value="Kitchen">Kitchen</option>
                  </select>
              </div>
              <div className="col-span-2 max-lg:col-span-3">
                  <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl] "
                  >
                      Product Description
                  </label>
                  <textarea
                      id="description"
                      rows={4}
                      value={data.description}
                      className="block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Write product description here"
                      onChange={(event) =>
                          dispatch({
                              type: "description",
                              data: event.target.value,
                          })
                      }
                  />
              </div>
              <div className="col-span-2 max-lg:col-span-3">
                  <label
                      className="block mb-2 text-sm font-medium text-gray-700 clamp-[sm-3cqw-xl]"
                      htmlFor="file_input"
                  >
                      Select image
                  </label>
                  <input
                      className="block px-1 py-2 w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                      id="file_input"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(event) => handleImage(event)}
                  />
              </div>
          </div>
  );
});

FormBody.propTypes = {
    data : propTypes.object,
    dispatch : propTypes.func,
    handleImage : propTypes.func,
}
export default FormBody