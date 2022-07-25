import React from "react";

import './style.css'

export default function Button(props){
    return(
            <button key={props.id} className="waves-effect waves-light btn">{props.name}</button> 
    )
}