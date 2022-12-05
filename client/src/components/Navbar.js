import React from 'react';
import {  Link } from "react-router-dom";

const Navbar= () =>{
    return (
        <div className='navbar'>
            <ul>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/featuredcars">Featured Cars</Link></li>
                <li><Link to="/meets">Events</Link></li>
                <li><Link to="/">Home</Link></li>
            </ul>
        </div>
    );
};
export default Navbar;