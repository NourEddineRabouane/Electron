const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

// Apply CORS middleware first
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const productsRouter = require("./routes/products");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const adminRouter = require("./routes/admin");
const logoutRouter = require("./routes/logout");

app.use("/products", productsRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/admin", adminRouter);
app.use("/logout", logoutRouter);

//
const port = 5000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
