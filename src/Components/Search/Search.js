import React, {useState, useEffect}from 'react'
import axios from 'axios'



const Search = (props) => {
    const [artist, setArtist] = useState([])
    const [tracks, setTracks] = useState([])

    //artist = [ 'drake'] == artist.length  = 1


    useEffect(()=>{
        searchArtist()
    },[])
    


    let searchArtist=()=>{
        const value = props.match.params.artist

        axios.get(`/api/search/?search=${value}`)
        .then(res => {
            if(res.data.length !== artist.length){
                setArtist(res.data)
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



    // const mappedArtists = artist.map((element,index)=>{
    //     return <img key={index} src={element.images[0].url} />
    // })





    




    return (
        <div style={{position:"relative", left:"50%"}}>
            {/* {mappedArtists} */}
        </div>
    )
}

export default Search
