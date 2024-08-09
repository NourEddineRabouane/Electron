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
import ManageProducts from "./admin/ManageProducts";
import { createContext, useEffect, useState } from "react";
//
export const context = createContext();
function App() {
    const [info, setInfo] = useState({login : false , userRole : 'user'});//used to manage the things that only should somone log in see
    useEffect(() => {
        const l = Cookies.get("info");
        if (l) setInfo(JSON.parse(l));
    }, []);
    return (
        <div className="flex flex-col  min-h-[100vh] relative w-full bg-light-thirdl bg-white">
            <Router>
                <context.Provider value={{ info, setInfo }}>
                    <div className="flex-1 w-full lg:mx-auto lg:max-w-[1100px] max-lg:px-2  block">
                        <Header />
                        <div className="flex-1 my-4  max-w-full min-w-full">
                            <Routes>
                                <Route path="/" exact element={<Home />} />
                                <Route
                                    path="/products"
                                    exact
                                    element={<Products />}
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
                                <Route path="/views"
                                exact
                                element={<Reviews />}
                                />
                                {info.userRole === "admin" && info.login && (
                                    <Route
                                        path="/admin"
                                        exact
                                        element={<ManageProducts />}
                                    />
                                )}
                            </Routes>
                        </div>
                    </div>
                    <ShoppingCart />
                </context.Provider>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
