import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";

const FeaturedCars = () => {
    const [cars, setCars] = useState([]);
    
  useEffect(() => {
    fetch('https://private-anon-8392e1557b-carsapi1.apiary-mock.com/cars')
      .then(response => response.json())
      .then(data => setCars(data));
    }, []);
    const filteredResults = cars.filter(cars => cars.horsepower >= 500); // sort out cars less than "x" horsepower
    filteredResults.sort(() => Math.random() - 0.5); // randomize the array for filtered cars
    const randomCars = filteredResults.slice(0, 4); // pick out 4 cars from the randomized array

    return(
        <div className="wrapper">
            <h1>Featured Cars</h1>
            <div className="banner-home">
                <Navbar/>
            </div>
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

            <footer>
                <p> Copyright &copy; 2022 Designed By: Brock Ericksen &nbsp; | &nbsp; Email: <a href="mailto:brockericksen@gmail.com">brockericksen@gmail.com</a></p>
            </footer>
        </div>
    );
};

export default FeaturedCars;