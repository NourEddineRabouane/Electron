import "./App.css";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reviews from "./pages/Reviews";
import ShoppingCart from "./components/ShoppingCart";
import Product from "./components/product/Product";
import { useEffect, useState } from "react";
import context from "./Context/AppContext"; //this context is created in auther file and use here
import ForgetPassword from "./pages/ForgetPassword";
import Dashboard from "./admin/Dashboard";
import ManageProducts from "./admin/ManageProducts";
import ManageUsers from "./admin/ManageUsers";
import AboutUs from "./pages/About";

//
function App() {
    const [info, setInfo] = useState({ login: false, userRole: "user" }); //used to manage the things that only should somone log in see
    useEffect(() => {
        const l = Cookies.get("info");
        if (l) setInfo(JSON.parse(l));
    }, []);
    return (
        <div className="flex flex-col  min-h-[100vh] relative w-full bg-light-thirdl bg-white">
            <Router>
                <context.Provider value={{ info, setInfo }}>
                    <Header />
                    <div className="flex-1 w-full lg:mx-auto lg:max-w-[1150px] max-lg:px-2  block">
                        <div className="flex-1 mb-4  max-w-full min-w-full">
                            <Routes>
                                <Route path="/" exact element={<Home />} />
                                <Route
                                    exact
                                    path="/products"
                                    element={<Products />}
                                />
                                <Route
                                    exact
                                    path={"/:productId"}
                                    element={<Product />}
                                />
                                <Route
                                    exact
                                    path={"/products/:productId"}
                                    element={<Product />}
                                />
                                <Route
                                    path="/login"
                                    exact
                                    element={<Login />}
                                />
                                <Route
                                    path="/signup"
                                    exact
                                    element={<Signup />}
                                />
                                <Route
                                    path="/views"
                                    exact
                                    element={<Reviews />}
                                />
                                <Route
                                    path="/FotgetPassword"
                                    exact
                                    element={<ForgetPassword />}
                                />
                                <Route
                                    path="/about"
                                    exact
                                    element={<AboutUs />}
                                />
                                {info.userRole === "admin" && info.login && (
                                    <Route
                                        path="/admin"
                                        exact
                                        element={<Dashboard />}
                                    >
                                        <Route
                                            path="products"
                                            exact
                                            element={<ManageProducts />}
                                        />
                                        <Route
                                            path="users"
                                            exact
                                            element={<ManageUsers />}
                                        />
                                    </Route>
                                )}
                            </Routes>
                        </div>
                    </div>
                    <ShoppingCart />
                </context.Provider>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
