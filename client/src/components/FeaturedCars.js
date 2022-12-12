import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";

const FeaturedCars = (props) => {
    const [cars, setCars] = useState([]);
    const [loggedUser, setLoggedUser] = useState("")
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
            .then((res)=>(
                fetch('https://private-anon-8392e1557b-carsapi1.apiary-mock.com/cars')
                    .then(response => response.json())
                    .then(data => setCars(data)),
                setLoggedUser({id:res.data.user._id, firstName:res.data.user.firstName})
            )).catch((err)=>(
                console.log(err)
            ))
    }, []);

    const handleLogout = (e) => {
        axios.post('http://localhost:8000/api/logout',{}, {withCredentials:true})
        .then((res)=>{
            console.log('Logged out on front end')
            navigate('/login')
        }).catch((err)=>{
            console.log(err)
        })
    }

    const filteredResults = cars.filter(cars => cars.horsepower >= 500); // sort out cars less than "x" horsepower
    filteredResults.sort(() => Math.random() - 0.5); // randomize the array for filtered cars
    const randomCars = filteredResults.slice(0, 4); // pick out 4 cars from the randomized array

    return(
        <div className="wrapper">
            <h1>Featured Cars</h1>
            <div className="banner-home"><Navbar/></div>
            {loggedUser ? (
                    <div>
                        <p style={{color: 'green'}}>Logged in as: {loggedUser.firstName}</p>
                        <button className = "btn hover" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                <div>
                    <p style={{color: 'red'}}>Please login/register to view this page!.</p>
                    <Link className="link" to="/login">Login | </Link>
                    <Link className="link" to="/register">Register</Link>
                </div>
                )}
            <div className="featured-cars-content">
                {randomCars.map(car => ( // map through the 4 random cars to be displayed
                <div key={car.id}>
                    <h3>{car.year} - {car.make} {car.model}</h3>
                    <p>Horsepower: {car.horsepower}</p>
                    <p>Price: ${car.price}</p>
                    <img src={car.img_url} alt={car.model}/>
                </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default FeaturedCars;