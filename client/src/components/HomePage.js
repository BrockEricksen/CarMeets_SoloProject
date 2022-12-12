import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = (props) => {
    const [loggedUser, setLoggedUser] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:8000/api/getLoggedUser', {withCredentials:true})
            .then((res)=>(
                console.log(res),
                setLoggedUser({id:res.data.user._id, firstName:res.data.user.firstName})
            )).catch((err)=>(
                console.log(err)
            ))
    }, [])

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
            <h1>Car Meets</h1>
            <div className="banner-home">
                <Navbar/>
                {/* <Link className="link" to="/login">Login | </Link>
                <Link className="link" to="/register">Register</Link> */}
                {loggedUser ? (
                    <div>
                        <p style={{color: 'green'}}>Logged in as: {loggedUser.firstName}</p>
                        <button className = "btn hover" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                <div>
                    <Link className="link" to="/login">Login | </Link>
                    <Link className="link" to="/register">Register</Link>
                    {/* <p style={{color: 'red'}}>Please log in to continue.</p> */}
                </div>
                )}
            </div>
            <div className="home-background"></div>
            <Footer/>
        </div>
    );
};

export default Home;