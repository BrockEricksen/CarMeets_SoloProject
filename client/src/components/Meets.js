import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Meets = (props) => {
    const [allMeets, setAllMeets] = useState([]);
    const [loggedUser, setLoggedUser] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
            .then((res)=>(
                console.log(res),
                setLoggedUser({id:res.data.user._id, firstName:res.data.user.firstName})
            )).catch((err)=>(
                console.log(err)
            ))
        axios.get("http://localhost:8000/api/meet",{withCredentials:true})
            .then((response) => {
                setAllMeets(response.data);
            })
            .catch((err) => {
                console.log(err.response);
        });
    }, []);

    const deleteHandler = (one_id) => { // delete one meet by id
        axios.delete(`http://localhost:8000/api/meet/${one_id}`,{withCredentials:true})
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

    const handleLogout = (e) => {
        axios.post('http://localhost:8000/api/logout',{}, {withCredentials:true})
        .then((res)=>{
            console.log('Logged out on front end')
            navigate('/login')
        }).catch((err)=>{
            console.log(err)
        })
    };

    return(
        <div className="wrapper">
            <h1>Upcoming Events</h1>
            <div className="banner-home"><Navbar/></div>
            {loggedUser ? (
                    <div>
                        <p style={{color: 'green'}}>Logged in as: {loggedUser.firstName}</p>
                        <button className = "btn hover" onClick={handleLogout}>Logout</button>
                        <div>
                            <Link to="/new">Add Event</Link>
                        </div>
                    </div>
                ) : (
                <div>
                    <p style={{color: 'red'}}>Please login/register to view this page!.</p>
                    <Link className="link" to="/login">Login | </Link>
                    <Link className="link" to="/register">Register</Link>
                </div>
                )}
            <div className="one-meet">
                {allMeets.map((meet, index) => { // maps through all meets in database
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
            {/* <Footer/> */}
        </div>
    );
};

export default Meets;