import axios from "axios";
import { useEffect , useState } from "react";

const useProduct = (productId) => {
    const [ product , setProduct ] = useState({});
    const [ error , setError ] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        axios
            .get(`http://localhost:5000/products/single/${productId}`, {
                signal: controller.signal,
            })
            .then((res) => {
                setProduct(res.data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setProduct(null);
            });

        return () => {
            //clean up function
            controller.abort();
        };
    }, [productId]);

    return { product , error }
    
}

export default useProduct;