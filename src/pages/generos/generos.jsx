import React, {useState} from "react";
import axios from 'axios'
import { useEffect } from "react";
import Button from "../../components/button/button";

import './style.css'

export default function Filme(){
    
    const [generos,setGeneros] = useState([]);

    useEffect(()=>{
        let isMounted = true
        async function obterGeneros(){
            let tipo = 'movie'
            let url = window.location.href.split('/')

            if(url[3] == 'tvgenres' ){
                tipo = 'tv'
            }
            axios.get(`https://api.themoviedb.org/3/genre/${tipo}/list?api_key=a49dd29d1dde0f60fd31a433d1dfc35a`).then((res)=>{   
                if(isMounted){
                    setGeneros(res.data.genres)
                }
            })
        }
        obterGeneros()
        return()=>{
            isMounted = false
        }
    },[])
    
    return(
        <>
        
            <h3>Genres</h3>
            <div className="botoes">
                {generos.map((genero)=>
                    <Button id={genero.id} name={genero.name} />                
                )
                }
            </div>
        </>
    )
}