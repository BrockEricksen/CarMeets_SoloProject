import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from './Footer';

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
            <h1 className='text-center text-4xl'>Register: </h1>
            <Navbar/>
            <div className="flex justify-center mr-auto">
                <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setFirstName(e.target.value)} value={firstName} name="firstName" type="text"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setLastName(e.target.value)} value={lastName} name="lastName" type="text"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setEmail(e.target.value)} value={email} name="email" type="email"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setPassword(e.target.value)} value={password} name="password" type="password"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} name="confirmPassword" type="password"/>
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default Register;