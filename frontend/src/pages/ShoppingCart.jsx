import Cart_products from "../components/Cart_products";


const ShoppingCart = () => {
  return (
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
          <h2 className="text-xl font-semibold">Your cart</h2>
            {/*the products added to the cart */}
            
            <Cart_products />

          <div className="space-y-1 text-right">
              <p>
                  Total amount:
                  <span className="font-semibold">357 €</span>
              </p>
          </div>
          <div className="flex justify-end space-x-4">
              <button
                  type="button"
                  className="px-6 py-2 border rounded-md dark:border-violet-600"
              >
                  Back
                  <span className="sr-only sm:not-sr-only">to shop</span>
              </button>
              <button
                  type="button"
                  className="px-6 py-2 border rounded-md dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600"
              >
                  <span className="sr-only sm:not-sr-only">Continue to</span>
                  Checkout
              </button>
          </div>
      </div>
  );
}

export default ShoppingCart