import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
    return (
        <>
                <nav className="flex gap-2 my-4 justify-between w-full text-xl max-xsm:text-sm">
                    <Link
                        to="products"
                        className="flex-grow p-4 bg-gray-200 text-gray-600 font-semibold focus:bg-transparent border rounded "
                    >
                        Manage Products
                    </Link>
                    <Link
                        to="users"
                        className="flex-grow p-4 bg-gray-200 text-gray-600 font-semibold  focus:bg-transparent border rounded "
                    >
                        Manage Users
                    </Link>
                </nav>
            <Outlet /> {/* This renders the nested routes */}
        </>
    );
};

export default Dashboard;
