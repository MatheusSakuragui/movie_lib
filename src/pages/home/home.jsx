import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css'

export default function Home(){
    const navigate = useNavigate()
    function Navegar(rota) {
        navigate(rota)
        window.location.reload()
    }
    
    const [rated,setRated] = useState([]);
    const [trending,setTrend] = useState([{}]);
    const [discover,setDiscover] = useState([]);
    const [index, setIndex] = useState(0);

    const getYear = (date) =>{
        return date.slice(0,4)
    }
    
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
  

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
                    setTrend(res.data.results)
                    console.log(res.data.results);
                   
                }
            })
        }
        obter()
        return()=>{
            isMounted = false
        }
    },[])
    return(
        <div className="conteudo">
            <Row>
                <Col xs={7}>
                    <div className="displayTrending">
                        <h1>Trending Topics <i className="fa-solid fa-arrow-trend-up"></i></h1>
                        <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} fade interval={8000}>
                            {trending.map((trend)=>
                                <Carousel.Item>
                                        <img
                                        className="d-block w-100"
                                        onClick={''}
                                        src={`https://image.tmdb.org/t/p/original/${trend.backdrop_path}`}
                                        />
                                        
                                    <Carousel.Caption>
                                        <div className="image" > 
                                            <h3><a>{trend.title? trend.title : trend.name}</a></h3>
                                        </div>                                
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </div>
                </Col>
                <Col>   
                    <div className="trendingInfo">      
                        {trending[index].title? 
                            <>
                                <h3><a>{`${trending[index].title} ${trending[index].release_date ? `(${getYear(trending[index].release_date)})` : '' }`}</a></h3> 
                            </>
                            : 
                            <>
                                <h3><a>{`${trending[index].name} ${trending[index].first_air_date? `(${getYear(trending[index].first_air_date)})` : '' }`}</a></h3>     
                            </>  
                        }
                        <img
                        onClick={''}
                        src={`https://image.tmdb.org/t/p/original/${trending[index].poster_path}`}/>     
                        <h4>Overview:</h4>
                        <p>{trending[index].overview}</p>
                    </div> 
                </Col>
            </Row>
                <div className= "divTop">
                    <h1>Top Rated <i className="fa-solid fa-star"></i></h1>
                    <div className="displayTop" >
    
                        <CardGroup style={{ width: '20rem' }} >
                            
                            <Card >
                                <Card.Img variant="top" src="https://image.tmdb.org/t/p/original//13r1DFhfL0qufFjXnrvWuh6qKqH.jpg" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                    </CardGroup>
             
                    
                    </div>
                </div>

            </div>             
    )
}