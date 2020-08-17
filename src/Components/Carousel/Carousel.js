import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Carousel = () => {
    const [album, setAlbum] = useState([])

    useEffect(()=>{
        getAlbums()
        
    },[])


    let getAlbums = () =>{
        axios.get('/api/albums')
        .then((res)=>{
            setAlbum(res.data)
            console.log(res)
        }
        .catch((err) => console.log(err))
    }



    
    return (
        <div className="carousel-container">
            <div className="carousel-display">
            <img src={''}/>

            </div>
        </div>
    )
}

export default Carousel
