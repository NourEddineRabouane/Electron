import propTypes from "prop-types";
import "./style.css";

export const Ellipse = ({ className }) => {
    return <div className={`ellipse ${className}`} />;
};

Ellipse.propTypes = {
    className: propTypes.string,
};
