import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";

const AddMeet = (props) => {
    const [loggedUser, setLoggedUser] = useState("");
    const [meetName, setMeetName] = useState("");
    const [meetHost, setMeetHost] = useState("");
    const [meetLocation, setMeetLocation] = useState("");
    const [meetDate, setMeetDate] = useState("");
    const [meetTime, setMeetTime] = useState("");
    const [description, setDescription] = useState("");
    const [socials, setSocials] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
            .then((res)=>(
                setLoggedUser({id:res.data.user._id, firstName:res.data.user.firstName})
            )).catch((err)=>(
                console.log(err)
            ))
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/meet", {
                meetName,
                meetHost,
                meetLocation,
                meetDate,
                meetTime,
                description,
                socials
            },{withCredentials:true})
            .then((res) => {
                navigate('/meets')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    };

    const handleLogout = (e) => {
        axios.post('http://localhost:8000/api/logout',{}, {withCredentials:true})
        .then((res)=>{
            console.log('Logged out on front end')
            navigate('/login')
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="wrapper">
            <h1>Create a New Meet</h1>
            <div className="banner-home">
                <Navbar/>
            </div>
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

            <form onSubmit={submitHandler}>
                <div className="form-fields">
                    <label>Meet Name: </label>
                    <input onChange={(e) => setMeetName(e.target.value)} value={meetName} name="meetName" type="text"/>
                    {/* {errors.meetName ? <p>{errors.meetName.message}</p> : null} */}
                </div>
                <br/>
                <div className="form-fields">
                    <label>Meet Host: </label>
                    <input onChange={(e) => setMeetHost(e.target.value)} value={meetHost} name="meetHost" type="text"/>
                    {/* {errors.meetHost && <p className="error">{errors.meetHost.message}</p>} */}
                </div>
                <br/>
                <div className="form-fields">
                    <label>Meet Location: </label>
                    <input onChange={(e) => setMeetLocation(e.target.value)} value={meetLocation} name="meetLocation" type="text"/>
                    
                </div>
                <br/>
                <div className="form-fields">
                    <label>Meet Date: </label>
                    {/* <input onChange={(e) => setMeetDate(e.target.value)} min={Date.now()} max="2024-12-31" value={meetDate} name="meetDate" type="date"/> */}
                    <input onChange={(e) => setMeetDate(e.target.value)} min={Date.now()} max="2024-12-31" value={meetDate} name="meetDate" type="date"/> {/* placeholder="mm/dd/yyyy" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" */}
                </div>
                <br/>
                <div className="form-fields">
                    <label>Meet Time: </label>
                    <input onChange={(e) => setMeetTime(e.target.value)} value={meetTime} name="meetTime" type="time"/> {/* placeholder="HH:MM AM/PM" pattern="[0-2][0-9]:[0-5][0-9]" */}
                    
                </div>
                <br/>
                <div className="form-fields">
                    <label>Meet Description: </label>
                    <input onChange={(e) => setDescription(e.target.value)} value={description} name="description" type="text"/>
                    {errors ? <p>{errors.message}</p> : null}
                </div>
                <br/>
                <div className="form-fields">
                    <label>Host Socials: </label>
                    <input onChange={(e) => setSocials(e.target.value)} value={socials} name="socials" type="text"/>
                    
                </div>
                <br/>
                <button className="btn hover hover-success" type="submit">Create Meet</button>
            </form>

            <Footer/>
        </div>
    );
};

export default AddMeet;