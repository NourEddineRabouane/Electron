import axios from "axios";
import { useEffect, useState } from "react";
//
//custom hook to handle requests to get diffrent products
export default function useProducts(operation) {
    const [products, setAllproducts] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    //
    useEffect(() => {
        const controller = new AbortController();
        if (operation.content === "") {
            //the first time the products component is rendering fetch all products
            setIsPending(true);

            axios
                .get("http://localhost:5000/products", {
                    signal: controller.signal,
                })
                .then((res) => {
                    setAllproducts(res.data);
                    setError(null);
                })
                .catch((err) => {
                    if (axios.isCancel(err))
                        console.log("Request aborted !", err.message); //
                    else setError(err.message);
                })
                .finally(() => {
                    setIsPending(false);
                });
        } else if (operation.type === "filter" && operation.content !== "") {
            //if the user want to filter products
            const data = { categorie: operation.content };
            setIsPending(true);

            axios
                .get("http://localhost:5000/products/categorie", {
                    params: data,
                    headers: { "Content-Type": "applicaton/json" },
                    signal: controller.signal,
                })
                .then((res) => {
                    setAllproducts(res.data);
                    setError(null);
                })
                .catch((err) => {
                    if (axios.isCancel(err))
                        console.log("Request aborted !", err.message); //
                    else setError(err.message);
                })
                .finally(() => {
                    setIsPending(false);
                });
        } else if (operation.type === "specific" && operation.content !== "") {
            //if the user wanted specific product
            setIsPending(true);

            axios
                .get(
                    `http://localhost:5000/products/specific?title=${operation.content}`,
                    {
                        signal: controller.signal,
                    }
                )
                .then((res) => {
                    if (res.data) setAllproducts(res.data);
                    setError(null);
                })
                .catch((err) => {
                    if (axios.isCancel(err))
                        console.log("Request aborted !", err.message); //
                    else {
                        setAllproducts(null);
                        if (err.response.status === 404)
                            setError(err.response.data.message);
                        //show the error message sent by the server if there is no similar product
                        else setError(err.message);
                    }
                })
                .finally(() => {
                    setIsPending(false);
                });
        }

        //
        return () => {
            controller.abort(); //abort the request
        };
    }, [operation]);
    return [products, isPending, error];
}
