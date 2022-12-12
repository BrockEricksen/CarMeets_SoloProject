import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";

const Login = (props) => {
    const [input, setInput] = useState({});
    const [loggedUser, setLoggedUser] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/login',{email: input.email, password: input.password},{withCredentials:true})
        .then((res)=>{
            navigate('/')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    const changeHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    return(
        <div className="wrapper">
            <h1>Log In</h1>
            <div className="banner-home">
                <Navbar/>
            </div>
            
            {loggedUser ? (
                <p style={{color: 'red'}}>Successfully logged in!</p>
            ) : (
            <div>
                <h3>Login</h3>
                <form className="login-form" onSubmit={submitHandler}>
                    <div className="login-email-input">
                        <label>Email: </label>
                        <input className="form-control" onChange={changeHandler} value={input.email} name="email" type="email" />
                    </div>
                    <div className="login-password-input">
                        <label>Password: </label>
                        <input className="form-control" onChange={changeHandler} value={input.password} name="password" type="password" />
                    </div>
                    <div className="row">
                        <button className="btn hover hover-success" type="submit">Login</button>
                    </div>
                </form>
            </div>
            )}

            <footer>
                <p> Copyright &copy; 2022 Designed By: Brock Ericksen &nbsp; | &nbsp; Email: <a href="mailto:brockericksen@gmail.com">brockericksen@gmail.com</a></p>
            </footer>
        </div>
    );
};

export default Login;