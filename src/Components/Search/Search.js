import React, {useState, useEffect}from 'react'
import axios from 'axios'
import '../Search/search.scss';



const Search = (props) => {
    const [artist, setArtist] = useState([])
    const [tracks, setTracks] = useState([])

    //artist = [ 'drake'] == artist.length  = 1


    useEffect(()=>{
        searchArtist()
    })
    


    let searchArtist=()=>{
        const value = props.match.params.artist

        axios.get(`/api/search/?search=${value}`)
        .then(res => {
            if(res.data && res.data.length !== artist.length){
                setArtist(res.data)
                console.log(res.data)
                res.data.forEach(element=>{
                    if(element.id){
                        axios.get(`/api/artist-track/${element.id}`)
                        .then(res =>{
                            setTracks(res.data)
                        })
                    }
                })
                // setArtist(res.data)
            }

        })
        .catch((err)=> console.log(err));

    }

    const mappedTracks = tracks.map((element,index)=>{
        console.log(element)
        return <div className='trackList' key={index}>
           <p> {element.name}</p> 
          

        </div>
    })

    const mappedArtists = artist.map((element,index)=>{
console.log(element)
        return <div key={index} >
                      <h1>{element.name} </h1>
                     <img className='artistImg' src={element.images[0].url} alt='no pic available'/>
            </div>
    })





    




    return (
        <div style={{position:"relative" }}>
            {mappedArtists}
            {mappedTracks}
        </div>
    )
}

export default Search
