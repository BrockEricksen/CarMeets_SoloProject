import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";

const Register = (props) => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/register',{
            firstName,
            lastName,
            email, 
            password,
            confirmPassword
            },{withCredentials:true})
        .then((res)=>{
            navigate('/')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div className="wrapper">
            <h1>Register: </h1>
            <div className="banner-home">
                <Navbar/>
            </div>

            <form className="" onSubmit={submitHandler}>
                <div className="">
                    <label htmlFor="">First Name:</label>
                    <input className="form-control" onChange={(e)=>setFirstName(e.target.value)} value={firstName} name="firstName" type="text" />
                </div>
                <div className="">
                    <label htmlFor="">Last Name:</label>
                    <input className="form-control" onChange={(e)=>setLastName(e.target.value)} value={lastName} name="lastName" type="text" />
                </div>
                <div className="">
                    <label htmlFor="">Email:</label>
                    <input className="form-control" onChange={(e)=>setEmail(e.target.value)} value={email} name="email" type="email" />
                </div>
                <div className="">
                    <label htmlFor="">Password:</label>
                    <input className="form-control" onChange={(e)=>setPassword(e.target.value)} value={password} name="password" type="password" />
                </div>
                <div className="">
                    <label htmlFor="">Confirm Password:</label>
                    <input className="form-control" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} name="confirmPassword" type="password" />
                </div>
                <div className="row">
                    <button className="btn hover hover-success" type="submit">Register</button>
                </div>
            </form>


            <footer>
                <p> Copyright &copy; 2022 Designed By: Brock Ericksen &nbsp; | &nbsp; Email: <a href="mailto:brockericksen@gmail.com">brockericksen@gmail.com</a></p>
            </footer>
        </div>
    );
};

export default Register;