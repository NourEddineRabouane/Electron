const reducer = (state, action) => {
    switch (action.type) {
        case "title":
            return { ...state, title: action.data };
        case "price":
            return { ...state, price: action.data };
        case "description":
            return { ...state, description: action.data };
        case "categorie":
            return { ...state, categorie: action.data };
        case "stock":
            return { ...state, stock: action.data };
        default:
            return state;
    }
};

export const modalReducer = (state, action) => {
    switch (action.type) {
        case "update":
            return {
                type: action.type,
                isVisble: true,
                title: action.title,
                id: action.id,
            };
        case "delete":
            return {
                type: action.type,
                isVisble: true,
                title: action.title,
                id: action.id,
            };
        case null:
            return {
                ...state,
                type: null,
                isVisble: false,
            };
        default:
            state;
    }
};
export default reducer;
