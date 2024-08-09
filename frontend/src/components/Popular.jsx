import { data } from "autoprefixer";
import { useEffect, useState } from "react";

const Popular = () => {
  const [ url , seturl ] = useState(null);
    useEffect(() => {
        // fetch("http://localhost:5000/popular")
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error("Network response was not ok");
        //         }
                
        //         return response.json();
        //         //
        
        //     })
        //     .then((data) => {
        //         console.log(data);
        //         const image = data.image;
        //         const imageSrc = `data:base64,${image.data}`;
        //         seturl(imageSrc);
               
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }, []);
    return (
        <div>
            <h2>Popular products</h2>
            {url && <img src={url}></img>}
            <section></section>
        </div>
    );
};

export default Popular;
