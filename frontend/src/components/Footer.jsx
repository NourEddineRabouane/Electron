import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="flex-shrink-0 bg-dark-thirdly w-full text-fontDark-secondary p-2 lg:px-16 mt-20 overflow-hidden">
            <div className="lg:mx-auto lg:max-w-[1024px] py-8">
                {/* Social Media Icons */}
                <div className="flex justify-center space-x-8 mb-4">
                    <a href="https://www.facebook.com/Electron">
                        <i className="fa-brands fa-facebook text-blue-500 text-3xl hover:text-blue-700 transition duration-300 transform hover:scale-110"></i>
                    </a>
                    <a href="https://www.instagram.com/Electron">
                        <i className="fa-brands fa-instagram text-pink-400 text-3xl hover:text-pink-600 transition duration-300 transform hover:scale-110"></i>
                    </a>
                    <a href="https://www.tiktok.com/Electron">
                        <i className="fa-brands fa-tiktok text-gray-800 text-3xl hover:text-gray-600 transition duration-300 transform hover:scale-110"></i>
                    </a>
                    <a href="https://web.whatsapp.com/send?phone=212556709090">
                        <i className="fa-brands fa-whatsapp text-green-500 text-3xl hover:text-green-700 transition duration-300 transform hover:scale-110"></i>
                    </a>
                </div>

                {/* About Us Link */}
                <div className="w-full flex justify-end mb-4 max-sm:pr-4">
                    <Link to="/about">
                        <h1 className="underline text-xl lg:text-2xl font-semibold text-gray-200 hover:text-white transition duration-300">
                            About us
                        </h1>
                    </Link>
                </div>

                {/* Contact Information */}
                <div className="text-center mt-8">
                    <h3 className="text-3xl font-bold text-gray-100">
                        Get in Touch
                    </h3>
                    <p className="mt-6 text-lg text-gray-400">
                        Have questions or need help? Contact us at{" "}
                        <a
                            href="mailto:support@electron.com"
                            className="text-indigo-400 hover:text-indigo-600 font-semibold transition duration-300"
                        >
                            support@electron.com
                        </a>{" "}
                        or give us a call at{" "}
                        <span
                            aria-selected={true}
                            className="font-bold text-white"
                        >
                            (+212) 556-709090
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
