import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShown: false,
    products: [],
    subtotal: 0,
};

//define all the operations wich will applied for the shopping card
export const shoppingcardSlice = createSlice({
    name: "shoppingCard",
    initialState: initialState,
    reducers: {
        show: (state) => {
            state.isShown = true;
        },
        hide: (state) => {
            state.isShown = false;
        },
        addProduct: (state, action) => {
            const product = action.payload;
            const index = state.products.findIndex(
                (item) => item.id === product.id
            );
            if (index !== -1) {
                //if the product is already in the list increment the quantity and the total
                ++state.products[index].quantity;
                state.products[index].total += product.price;
            } else state.products.push(product); // else push the product in the cart
            state.subtotal += action.payload.price;
        },
        removeProduct: (state, action) => {
            const product = state.products.find(
                (item) => item.id === action.payload.id
            );
            state.products = state.products.filter(
                (product) => product.id !== action.payload.id
            );
            if (product) state.subtotal -= product.total; //substruct the subtotal of the removed  product tatal price
        },
        //product price
        incProductPrice: (state, action) => {
            const { id } = action.payload;
            state.products.map((product) => {
                if (product.id === id) {
                    ++product.quantity; //icrement quantity
                    product.total = product.price * product.quantity; //calculate the total price
                    state.subtotal += product.price;
                }
            });
        },
        decProductPrice: (state, action) => {
            const { id } = action.payload;
            state.products.map((product) => {
                if (product.id === id) {
                    if (product.quantity > 1) {
                        --product.quantity; //decrement the quantity if it was more than 1
                        product.total = product.price * product.quantity; //calculate the total price
                        state.subtotal -= product.price;
                    }
                }
            });
        },
    },
});

export const {
    show,
    hide,
    addProduct,
    removeProduct,
    incProductPrice,
    decProductPrice,
} = shoppingcardSlice.actions;
export default shoppingcardSlice.reducer; //the reducer that will stored
