import React, {useState, useEffect}from 'react'
import axios from 'axios'



const Search = (props) => {
    const [artist, setArtist] = useState([])

    useEffect(()=>{
        searchArtist()
    })
    


    let searchArtist=()=>{

        const value = props.match.params.artist

        axios.get(`/api/search/?search=${value}`)
        .then(res=> setArtist(res.data))
        .catch((err)=> console.log(err));

    }




    return (
        <div>
           
        </div>
    )
}

export default Search
