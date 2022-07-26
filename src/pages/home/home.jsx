import React, {useState, useEffect} from "react";
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css'

export default function Home(){
    

    const [rated,setRated] = useState([]);
    const [trending,setTrend] = useState([{}]);
    const [discover,setDiscover] = useState([]);
    const [index, setIndex] = useState(0);
    
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
        <>
        <Row>
            <Col xs={7}>
                <div className="displayTrending">
                    <h1>Trending Topics <i class="fa-solid fa-arrow-trend-up"></i></h1>
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
                                        <h3>{trend.title? trend.title : trend.name}</h3>
                                    </div>                                
                                </Carousel.Caption>
                            </Carousel.Item>

                        )}
                    </Carousel>
                </div>
            </Col>
            <Col>
                <div className="trendingInfo">
                    <h3>{trending[index].title? `${trending[index].title}(${trending[index].release_date.slice(0,4)})` : `${trending[index].name}(${trending[index].first_air_date.slice(0,4)})`}</h3>
                    <h5>{}</h5>
                </div>   
            </Col>

        </Row>

           {/*  <div className="displayRated">
                <Card style={{ width: '17rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>*/}
        </>             
    )
}