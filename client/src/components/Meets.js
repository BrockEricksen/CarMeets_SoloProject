import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Meets = (props) => {
    const [allMeets, setAllMeets] = useState([]);
    const [loggedUser, setLoggedUser] = useState("")

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

    return(
        <div className="wrapper">
            <h1 className="text-center text-4xl">Upcoming Events</h1>
            <Navbar/>

            {loggedUser ? (
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"><Link to="/new">Add Event</Link></button>
                ) : (
                <div>
                    <p className="text-center text-xl text-red-500">Please login/register to view this page!</p>
                </div>
                )}

            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b">
                                    <tr>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Meet Name
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Host
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Location
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Date
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Time
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Description
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Host's socials
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {allMeets.map((meet, index) => { // maps through all meets in database
                                return ( 
                                <tr className="border-b" key={meet._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meet.meetName}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{meet.meetHost}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{meet.meetLocation}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{meet.meetDate}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{meet.meetTime}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{meet.description}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{meet.socials}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <Link to={`/edit/${meet._id}`}> Edit&nbsp; | </Link>
                                        <Link onClick={()=>deleteHandler(meet._id)}> &nbsp;Delete</Link>
                                    </td>
                                </tr>
                                );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Meets;