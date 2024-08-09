import { createSlice } from "@reduxjs/toolkit";

export const globalModal = createSlice({
    name: "global-modal",
    initialState: {
        isVisible: false,
        // type: null,
        // status: null,
        message: null,
        err: null,
    },

    reducers: {
        setGlobalModal: (state, action) => {
            const { type, status, err } = action.payload; //this stuff is passed based on user action
            state.isVisible = true;

            switch (type) {
                case "add":
                    if (status === "success") {
                        state.message =
                            "Products has been added successfully";
                        state.err = err;
                    } else if (status === "failed") {
                        state.err = err;
                        state.message =
                            "Product hasn't been added successfully.";
                    }
                    break;
                case "all":
                    if (status === "failed") {
                        state.message =
                            "Products hasn't been uploaded successfully";
                        state.err = err;
                    }
                    break;

                case "update":
                    if (status === "success") {
                        state.message =
                            "Products has been updated successfully.";
                    } else if (status === "failed") {
                        state.err = err;
                        state.message =
                            "Product hasn't been updated successfully.";
                    }
                    break;
                case "delete":
                    if (status === "success") {
                        state.message =
                            "Products has been deleted successfully.";
                    } else if (status === "failed") {
                        state.err = err;
                        state.message =
                            "Product hasn't been deleted successfully.";
                    }
                    break;
                default:
                    state.isVisible = false;
                    state.message = null;
                    state.err = null;
            }
        },
        hideGlobalModal: (state) => {
            state.isVisible = false;
            // state.type = null;
            // state.status = null;
            state.err = null;
            state.message = null;
        },
    },
});

export const { setGlobalModal, hideGlobalModal } = globalModal.actions;
export default globalModal.reducer;
