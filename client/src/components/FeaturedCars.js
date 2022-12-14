import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";

const FeaturedCars = (props) => {
    const [cars, setCars] = useState([]);
    const [loggedUser, setLoggedUser] = useState("")
    
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

    const filteredResults = cars.filter(cars => cars.horsepower >= 500); // sort out cars less than "x" horsepower
    filteredResults.sort(() => Math.random() - 0.5); // randomize the array for filtered cars
    const randomCars = filteredResults.slice(0, 4); // pick out 4 cars from the randomized array

    return(
        <div className="wrapper">
            <h1 className="text-center text-4xl">Featured Cars</h1>
            <Navbar/>
            {loggedUser ? (
                <p></p>
                ) : (
                <div>
                    <p className="text-center text-xl text-red-500">Please login/register to view this page.</p>

                </div>
                )}
            <p className="text-center text-red-400 mb-10">Unfortunatly, the api's image links dont work, so I removed them from this page for now.</p>
            <div className="text-center content-center justify-center">
                {randomCars.map(car => ( // map through the 4 random cars to be displayed
                <div key={car.id}>
                    <h3 className="text-2xl">{car.year} - {car.make} {car.model}</h3>
                    <p className="text-lg">Horsepower: {car.horsepower}</p>
                    <p className="text-lg">Price: ${car.price}</p>
                    {/* <img src={car.img_url} alt={car.model}/> */}
                    <br/>
                </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default FeaturedCars;