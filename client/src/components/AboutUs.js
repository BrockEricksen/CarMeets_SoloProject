import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {

    return(
        <div className="wrapper">
            <h1>About Us</h1>
            <div className="banner-home">
                <Navbar/>
            </div>
            <div className="about-content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean imperdiet rhoncus ipsum sit amet fermentum. Vestibulum a egestas sapien. In aliquet, orci sed euismod posuere, ligula diam tristique augue, vel posuere velit elit sed tortor. Aenean vehicula, lectus ut tempor elementum, libero ipsum fringilla risus, id scelerisque odio erat non nulla. Suspendisse potenti. Vivamus ultricies, quam eget finibus accumsan, turpis dolor volutpat ligula, semper volutpat velit quam efficitur risus. Etiam in accumsan eros, at fermentum dolor. Aenean tincidunt pharetra ipsum quis malesuada. Sed dui urna, dictum id lobortis a, sodales sit amet libero. Fusce posuere velit fermentum lorem laoreet pellentesque. Phasellus in pretium ipsum. Etiam blandit, dui in luctus pharetra, ipsum magna malesuada neque, nec interdum tellus dui in libero.</p>
            </div>
            <Footer/>
        </div>
    );
};

export default About;