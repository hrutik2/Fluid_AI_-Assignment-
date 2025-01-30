import { Route, Routes } from "react-router-dom";
import Home from "../page/home";
import Signup from "../page/singup";
import Login from "../page/login";
import { AddTaskdata } from "./add";



const AllRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/singup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/add" element={<AddTaskdata/>}/>
        </Routes>
    )
}
export default AllRoutes;