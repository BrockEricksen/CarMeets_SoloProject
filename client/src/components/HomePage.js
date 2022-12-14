import {React} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = (props) => {

    return(
        <div className="wrapper">
            <h1 className="text-center text-4xl">Car Meets</h1>
            <Navbar/>
            <div className="home-background"></div>
            <Footer/>
        </div>
    );
};

export default Home;