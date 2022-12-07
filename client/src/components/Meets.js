import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Meets = () => {
    const [allMeets, setAllMeets] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/meet")
        .then((response) => {
            setAllMeets(response.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }, []);

    const deleteHandler = (one_id) => {
        axios.delete(`http://localhost:8000/api/meet/${one_id}`)
            .then((res) => {
                const newMeetList = allMeets.filter((meet) => {
                    return meet._id !== one_id;
                })
                setAllMeets(newMeetList)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return(
        <div className="wrapper">
            <h1>Upcoming Events</h1>
            <div className="banner-home">
                <Navbar/>
                <Link to="/new">Add Event</Link>
            </div>

            <div className="one-meet">
                {allMeets.map((meet, index) => {
                    return (
                        <p key={meet._id}>
                            <p>Car Meet: {meet.meetName}</p>
                            <p>Host: {meet.meetHost}</p>
                            <p>Location: {meet.meetLocation}</p>
                            <p>Date: {meet.meetDate}</p>
                            <p>Time: {meet.meetTime}</p>
                            <p>Description: {meet.description}</p>
                            <p>Host Socials: {meet.socials}</p>
                            <Link to={`/edit/${meet._id}`}> Edit&nbsp; | </Link>
                            <Link onClick={()=>deleteHandler(meet._id)}> &nbsp;Delete</Link>
                        </p>
                        );
                    })}
            </div>

            <footer>
                <p> Copyright &copy; 2022 Designed By: Brock Ericksen &nbsp; | &nbsp; Email: <a href="mailto:brockericksen@gmail.com">brockericksen@gmail.com</a></p>
            </footer>
        </div>
    );
};

export default Meets;