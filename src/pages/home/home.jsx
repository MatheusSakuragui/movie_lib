import React, {useState, useEffect} from "react";
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel';



export default function Home(){
    const [rated,setRated] = useState([]);
    const [trending,setTrend] = useState([]);
    const [discover,setDiscover] = useState([]);

    useEffect(()=>{
        let isMounted = true
        async function obter(){
            axios.get(`
            https://api.themoviedb.org/3/movie/top_rated?api_key=a49dd29d1dde0f60fd31a433d1dfc35a`).then((res)=>{   
                if(isMounted){
                    setRated(res.data)
                }
            })
            axios.get(`
            https://api.themoviedb.org/3/trending/all/day?api_key=a49dd29d1dde0f60fd31a433d1dfc35a`).then((res)=>{   
                if(isMounted){
                    setTrend(res.data)
                    console.log(res.data);
                    console.log(trending);
                }
            })
        
        }
        obter()
        return()=>{
            isMounted = false
        }
    },[])
    return(
        <>
           
      
        </>
    )
}