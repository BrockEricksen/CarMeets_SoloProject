import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {

    return(
        <div className="wrapper">
            <h1>Car Meets</h1>
            <div className="banner-home">
                <Navbar/>
                <Link className="link" to="/login">Login | </Link>
                <Link className="link" to="/register">Register</Link>
            </div>
        </div>
    );
};

export default Home;