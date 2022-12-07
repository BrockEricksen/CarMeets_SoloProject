import React from "react";
import Navbar from "./Navbar";

const Login_Reg = () => {

    return(
        <div className="wrapper">
            <h1>Log In / Register</h1>
            <div className="banner-home">
                <Navbar/>
            </div>
            <footer>
                <p> Copyright &copy; 2022 Designed By: Brock Ericksen &nbsp; | &nbsp; Email: <a href="mailto:brockericksen@gmail.com">brockericksen@gmail.com</a></p>
            </footer>
        </div>
    );
};

export default Login_Reg;