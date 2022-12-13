import {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";

const EditMeet = (props) => {
    const { id } = useParams();
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
        axios.get(`http://localhost:8000/api/meet/${id}`, {withCredentials:true})
            .then((res) => {
                setMeetName(res.data.meetName);
                setMeetHost(res.data.meetHost);
                setMeetLocation(res.data.meetLocation);
                setMeetDate(res.data.meetDate);
                setMeetTime(res.data.meetTime);
                setDescription(res.data.description);
                setSocials(res.data.socials);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id]);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/meet/${id}`, {
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
            <h1>Edit: {meetName}</h1>
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
                    <input onChange={(e) => setMeetDate(e.target.value)} value={meetDate} name="meetDate" type="date"/>
                    
                </div>
                <br/>
                <div className="form-fields">
                    <label>Meet Time: </label>
                    <input onChange={(e) => setMeetTime(e.target.value)} value={meetTime} name="meetTime" type="time"/>
                    
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
                <button className="btn hover hover-success" type="submit">Edit Meet</button>
            </form>

            <Footer/>
        </div>
    );
};

export default EditMeet;