import React, {useState, useEffect}from 'react'
import axios from 'axios'



const Search = (props) => {
    const [artist, setArtist] = useState([])

    useEffect(()=>{
        searchArtist()
    },[artist])
    


    let searchArtist=()=>{

        const value = props.match.params.artist
        console.log(value)
        axios.get(`/api/search/?search=${value}`)
        .then(res => setArtist(res.data))
        .catch((err)=> console.log(err));

    }
    
    console.log(artist.items)




    return (
        <div>
           {/* ( {artist}?
           <div>
                    <h1>{artist.items}</h1>
           </div>
           :null) */}
        </div>
    )
}

export default Search
