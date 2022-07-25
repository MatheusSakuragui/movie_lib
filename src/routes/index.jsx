import React from "react";
import { Route, BrowserRouter, Routes as Switch } from "react-router-dom";


import NavBar from "../components/navBar/navbar";
import Generos from "../pages/generos/generos";
import Home from "../pages/home/home";



function Routes(){
    return(
        <>
        <BrowserRouter>
            <NavBar/>
                <Switch>
                    <Route path="/" element={<Home/>} />
                    <Route path="/moviegenres" element={<Generos/>} />
                    <Route path="/tvgenres" element={<Generos/>} />
                                
                </Switch>
        </BrowserRouter>
        </>
    )
}

export default Routes;