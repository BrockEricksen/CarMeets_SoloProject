import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "./Navbar";
import Footer from "./Footer";

const EditMeet = (props) => {
    const { id } = useParams();
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

    return(
        <div className="wrapper">
            <h1>Edit: {meetName}</h1>
            <Navbar/>

            <div className="flex justify-center mr-auto">
                <form className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Meet Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setMeetName(e.target.value)} value={meetName} name="meetName" type="text"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Meet Host</label>
                        <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setMeetHost(e.target.value)} value={meetHost} name="meetHost" type="text"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                        <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setMeetLocation(e.target.value)} value={meetLocation} name="meetLocation" type="text"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
                        <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setMeetDate(e.target.value)} min={Date.now()} max="2024-12-31" value={meetDate} name="meetDate" type="date"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Time</label>
                        <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setMeetTime(e.target.value)} value={meetTime} name="meetTime" type="time"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setDescription(e.target.value)} value={description} name="description" type="text"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Host Socials</label>
                        <input className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setSocials(e.target.value)} value={socials} name="socials" type="text"/>
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Edit Meet</button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default EditMeet;