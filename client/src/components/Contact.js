import React from "react";
import Navbar from "./Navbar";

const Contact = () => {

    return(
        <div className="wrapper">
            <h1>Contact Us</h1>
            <div className="banner-home">
                <Navbar/>
            </div>
            <footer>
                <p> Copyright &copy; 2022 Designed By: Brock Ericksen &nbsp; | &nbsp; Email: <a href="mailto:brockericksen@gmail.com">brockericksen@gmail.com</a></p>
            </footer>
        </div>
    );
};

export default Contact;