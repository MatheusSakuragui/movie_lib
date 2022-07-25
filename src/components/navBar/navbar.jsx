import React from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import './style.css'

export default function NavBar(){
    const navigate = useNavigate()
    function Navegar(rota) {
        navigate(rota)
        window.location.reload()
    }
        
    return(
        <div className="navClass">
            <nav>
                <div className="nav-wrapper grey darken-4">
                        <ul id="nav-mobile" className="right hide-on-med-and-down ">
                            <li><a onClick={(e)=>Navegar('/moviegenres')}>Movies</a></li>
                            <li><a onClick={(e)=>Navegar('/tvgenres')}>TV Series</a></li>
                            <li><a onClick={(e)=>Navegar('/moviegenres')}>Home</a></li>
                            <li><a onClick={(e)=>Navegar('/moviegenres')}>Search</a></li>
                            <li><a onClick={(e)=>Navegar('/moviegenres')}>Sassssss</a></li>
                        </ul>
                </div>
            </nav>
        </div>

    )
}