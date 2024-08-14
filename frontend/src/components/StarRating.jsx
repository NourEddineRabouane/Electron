import axios from "axios";
import { memo , useState } from "react";
import PropTypes from "prop-types"
const StarRating = memo(function StarRating({
    readOnly,
    productId,
    userId,
    Rating,
}) {
    const [rating, setRating] = useState(Rating ? Rating : 0); //number of stars
    const [hover, setHover] = useState(0);

    const handleRate = () => {
        const controller = new AbortController();
        //rate the product your self
        axios
            .put(
                `http://localhost:5000/rating/?productId=${productId}&userId=${userId}`,
                { rating },
                { signal: controller.signal }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) console.error(err);
            });
        return () => {
            controller.abort();
        };
    };
    if (readOnly)
        return (
            <div className="flex flex-col gap-4">
                <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                aria-readonly={true}
                                key={index}
                                className={index <= rating ? "on" : "off"}
                            >
                                <span className="star fs-2 text-3xl">
                                    &#9733;
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    return (
        <div className="flex  flex-col items-center gap-4">
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={
                                index <= (hover || rating) ? "on" : "off"
                            }
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star fs-2 text-5xl">&#9733;</span>
                        </button>
                    );
                })}
            </div>

            <button
                onClick={handleRate}
                className="bg-red-400 text-white px-5 py-2 rounded-lg hover:bg-red-500"
            >
                Rate
            </button>
        </div>
    );
});
StarRating.propTypes = {
    readOnly: PropTypes.bool.isRequired,
    productId: PropTypes.string,
    userId: PropTypes.string || null,
    Rating: PropTypes.number || null,
};
export default StarRating;