import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Meets from "./components/Meets";
import AddMeet from "./components/AddMeet";
import EditMeet from "./components/EditMeet";
import FeaturedCars from "./components/FeaturedCars";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/meets" element={<Meets/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/featuredcars" element={<FeaturedCars/>}/>
          <Route path="/about" element={<AboutUs/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/new" element={<AddMeet/>}/>
          <Route path="/edit/:id" element={<EditMeet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;