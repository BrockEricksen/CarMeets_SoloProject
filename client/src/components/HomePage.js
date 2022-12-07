import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {

    return(
        <div className="wrapper">
            <h1>Car Meets</h1>
            <div className="banner-home">
                <Navbar/>
                <Link className="link" to="/login_reg">Login | </Link>
                <Link className="link" to="/login_reg">Register</Link>
            </div>
            <div className="home-background"></div>
            <footer>
                <p> Copyright &copy; 2022 Designed By: Brock Ericksen &nbsp; | &nbsp; Email: <a href="mailto:brockericksen@gmail.com">brockericksen@gmail.com</a></p>
            </footer>
        </div>
    );
};

export default Home;