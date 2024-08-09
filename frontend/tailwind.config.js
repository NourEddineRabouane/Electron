const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                light: {
                    primary: "#DADEE1",
                    secondary: "#EEF0F2",
                    thirdly: "#F9F9F9",
                },
                dark: {
                    primary: "#26292b",
                    secondary: "#222222",
                    thirdly: "#151819",
                },
                fontLight: {
                    primary: "#26292b",
                    secondary: "#273336",
                    thirdly: "#6e7577",
                },
                fontDark: {
                    primary: "#e8e4df",
                    secondary: "#d0d0d0",
                    thirdly: "#eef0f2",
                },
            },
            keyframes: {
                slide: {
                    "0%": { left: "100%" },
                    "10%, 30%": { left: "0%" },
                    "40%, 100%": { left: "-100%" },
                },
                "slide-in-right": {
                    //for modal
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0)" },
                },
            },
            animation: {
                "slide-1": "slide 12s infinite 0s",
                "slide-2": "slide 12s infinite 6s",
                "slide-3": "slide 12s infinite 12s", // Ajout d'une animation de fondu en entrée
                "slide-in-right": "slide-in-right 0.5s ease-out forwards",
            },
            screens: {
                xsm: "448px",
            },
        },
    },

    plugins: [
        require("@tailwindcss/aspect-ratio"),
        plugin(({ matchUtilities, theme }) => {
            matchUtilities({
                clamp(value) {
                    // load font sizes from theme
                    const sizes = theme("fontSize");

                    // parse the value passed in from class name
                    // split it by "-" and compare pieces to fontSize values
                    const split = value
                        .split("-")
                        .map((v) => (sizes[v] ? sizes[v]["0"] : v));

                    // return a clamped font-size
                    return {
                        fontSize: `clamp(${split[0]}, ${split[1]}, ${split[2]})`,
                    };
                },
            });
        }),
    ],
};
