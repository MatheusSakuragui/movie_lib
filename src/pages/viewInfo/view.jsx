import React, {useState} from "react";
import axios from 'axios'
import { useEffect } from "react";
import './view.css'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "../../components/button/button";

import imdb from "../../assets/img/IMDB_logo.svg"
import tomato from "../../assets/img/Rotten_Tomatoes_logo.svg"
import metacritic from "../../assets/img/Metacritic_logo.svg"
import tmdb from "../../assets/img/TMDB_logo.svg"


export default function View(){

    const [notas,setNotas] = useState([{}])
    const [info,setInfo] = useState([{}]);
    
    function formatarNota(nota){
        nota = nota.toString()
        if( nota.includes('/') && nota.includes('.')){
            nota = nota.substr(0,3)
        }
        else if (nota.includes('/')) {
            nota =  nota.slice(0,2)
        }
        else if(nota.includes('.')){
            
            nota = nota.replace('.','')
            nota = nota.slice(0,2)
            console.log(nota)
            nota = nota +'%'
        }
        return nota 
    }

    function identificarLogo(nome){
        if (nome == 'Internet Movie Database') {
            return imdb
        }else if (nome == 'Metacritic'){
            return metacritic
        }else{
            return tomato
        }
    }

    useEffect(()=>{
        let isMounted = true
        async function obterGeneros(){
            let url = window.location.href.split('/')

          
  
         
            axios.get(`https://api.themoviedb.org/3/${url[4]}/${url[5]}?api_key=a49dd29d1dde0f60fd31a433d1dfc35a`).then((res)=>{   
                if(isMounted){
                    setInfo(res.data)
                    axios.get(`http://www.omdbapi.com/?i=${res.data.imdb_id}&apikey=3b5d70c9`).then((res)=>{
                        if(isMounted){
                            setNotas(res.data.Ratings)
                            console.log(res.data.Ratings);
                        }
                    })
                    
                }
            })
           


        }
        obterGeneros()
        return()=>{
            isMounted = false
        }
    },[])
    
    return(
        <div className="conteudo">
            <img className="backdrop" src={`https://image.tmdb.org/t/p/original/${info.backdrop_path }`} />
            <Row>
                <Col xs={3}>
                    <img className="poster" src={`https://image.tmdb.org/t/p/original/${info.poster_path }`} />
                </Col>
                <Col>
                <Row>
                    <h1>{info.title? info.title : info.name }</h1>
                    {notas.map((nota)=>
                        <Col className="notas">
                            <h3><img className={nota.Source} src={identificarLogo(nota.Source)}/> {nota.Value ? formatarNota(nota.Value) : 'Sem Nota'}</h3>
                        </Col>
                    )}
                    <Col className="notas">
                        <h3><img className='tmdb'src={tmdb}/> {info.vote_average ? formatarNota(info.vote_average) : 'Sem Nota'} </h3>
                    </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}