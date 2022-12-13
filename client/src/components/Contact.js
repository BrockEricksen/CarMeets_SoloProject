import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();

    return(
        <div className="wrapper">
            <h1>Contact Us</h1>
            <div className="banner-home">
                <Navbar/>
            </div>
            <div className="contact-form">
            <form className="contact-form" onSubmit={navigate('/')}>
                    <div className="login-email-input">
                        <p>Email: </p>
                        <input className="form-control" name="email" type="email" />
                    </div>
                    <div className="login-password-input">
                        <p>Comments or Feedback: </p>
                        <textarea className="form-control" name="feedback" rows={"5"} cols={"40"}/>
                    </div>
                    <div className="row">
                        <button className="btn hover hover-success" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default Contact;