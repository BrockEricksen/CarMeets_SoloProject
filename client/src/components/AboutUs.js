import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {

    return(
        <div className="wrapper">
            <h1 className="text-center text-4xl">About Us</h1>
            <Navbar/>
            <div className="about-background-img">
                <div className="p-20 text-center">
                    <p className="text-xl">This website has been made to unite car enthusists and create a community around grassroots motorsports. I want this website to provide car enthusists a forum to find out about local events and check out what we are doing and what is going on in the area. Car Meets is also intended to be informative, which should provide people with some knowledge about cars that they may have previously not known.</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default About;