import React, {useState, useEffect} from "react";
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {useNavigate} from 'react-router-dom'

import Slider from "react-slick";

import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

import GoPage from "../../utils/goPage";
import './style.css'

export default function Home(){
   

    const [trending,setTrend] = useState([{}]);
    const [upcoming,setUpcoming] = useState([{}]);
    const [discover,setDiscover] = useState([{}]);
    const [genres,setGenres] = useState([{}])

    const [index, setIndex] = useState(0);

    const settings = {
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 3
      };

  

    function verMais(id,type){
        GoPage(id,type)
    }

    const getYear = (date) =>{
        return date.slice(0,4)
    }
    
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };

    useEffect(()=>{
        async function obter(){
            axios.get(`
            https://api.themoviedb.org/3/discover/movie?api_key=a49dd29d1dde0f60fd31a433d1dfc35a`).then((res)=>{   
                    setDiscover(res.data.results)
            })

            axios.get(`
            https://api.themoviedb.org/3/trending/all/day?api_key=a49dd29d1dde0f60fd31a433d1dfc35a`).then((res)=>{   
                    setTrend(res.data.results)
                    console.log(res.data.results);
            })

            axios.get(`
            https://api.themoviedb.org/3/movie/upcoming?api_key=a49dd29d1dde0f60fd31a433d1dfc35a`).then((res)=>{    
                    setUpcoming(res.data.results)
                    console.log("Upcoming",res.data.results);
            })

            axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=a49dd29d1dde0f60fd31a433d1dfc35a`).then((res)=>{    
                setGenres(res.data.genres)
                console.log(res.data.genres);
            })            
        }
        obter()
    },[])

    function acharGenero(ids){
        console.log(ids);
        let texto = []
        for (let indexId = 0; indexId < ids.length; indexId++) {
            for (let indexGenero = 0; indexGenero < genres.length; indexGenero++) {
                if(ids[indexId] == genres[indexGenero].id){
                    texto.push(genres[indexGenero].name)
                }
                
            }
        }
        return texto.join(', ')
    }
    
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
                                <h3><a href={`view/${trending[index].media_type}/${trending[index].id}`}>{`${trending[index].title} ${trending[index].release_date ? `(${getYear(trending[index].release_date)})` : '' }`}</a></h3> 
                            </>
                            : 
                            <>
                                <h3><a onClick={(e) => verMais(trending[index].id,trending[index].media_type)}>{`${trending[index].name} ${trending[index].first_air_date? `(${getYear(trending[index].first_air_date)})` : '' }`}</a></h3>     
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
            <Row>
                <div className="displayUpcoming">
                    <h1>Upcoming <i class="fa-solid fa-calendar-plus"></i></h1>
                    <Slider {...settings}>
                        {upcoming.map((up)=>
                            <div>
                                <Card border="light" style={{ width: '20rem' }}>
                                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${up.backdrop_path}`} />
                                    <Card.Body>
                                        <Card.Title>{up.title}</Card.Title>
                                        <Card.Text>
                                            <h6>{up.release_date} • {up.genre_ids? acharGenero(up.genre_ids) : null }</h6>
                                            {up.overview}
                                        </Card.Text>
                                        <Button variant="primary">Go somewhere</Button>
                                    </Card.Body>
                                    </Card>
                            </div>
                        )}
                    </Slider>
                </div>
        </Row>
                        
            </div>             
    )
}