import {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Navbar= () =>{
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

    return (
        <nav class="bg-white border-gray-200 px-4 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div class="container flex flex-wrap items-center justify-between mx-auto">
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' to="/">Home</Link>
                        </li>
                        <li>
                            <Link className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' to="/meets">Events</Link>
                        </li>
                        <li>
                            <Link className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' to="/featuredcars">Featured Cars</Link>
                        </li>
                        <li>
                            <Link className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' to="/contact">Contact</Link>
                        </li>

                        {loggedUser ? (
                            <li>
                                <button className = "bg-slate-300 block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" onClick={handleLogout}>Logout: {loggedUser.firstName}</button>
                            </li>
                            ) : (
                            <ul className="flex flex-col border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link className="bg-slate-300 block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link className="bg-slate-300 block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/register">Register</Link>
                                </li>
                            </ul>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;