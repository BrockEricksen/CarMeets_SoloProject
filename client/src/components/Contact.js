import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();

    return(
        <div className="wrapper">
            <h1 className="text-center text-4xl">Contact Us</h1>
            <Navbar/>

            <div className="contact-background-img">
                <div className="flex justify-center mr-auto">
                    <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={navigate('/')}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email"/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Feedback or Comments</label>
                            <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="feedback" type="text"/>
                        </div>
                        <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Contact;