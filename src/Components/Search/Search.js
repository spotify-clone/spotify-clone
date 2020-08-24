import React, {useState, useEffect}from 'react'
import axios from 'axios'
import '../Search/search.scss';
import Sound from 'react-sound';



const Search = (props) => {
    const [artist, setArtist] = useState([])
    const [tracks, setTracks] = useState([])

    //song's value will be the selected track the user wants to listen to
    const [ song , setSong] = useState('');

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
        let audio;
    
        //condition to filter out any null or undefined values --> not working for some reason
        if(element.preview_url !== null || element.preview_url !== undefined){
            audio = element.preview_url
        }

        //buttons to control which track to play
        return <div className='trackList'key={index}>
            {
            song ? <div><button onClick={() => setSong('')}>Stop Track</button><p> {element.name}</p></div>
            : 
            <div><button onClick={() => setSong(audio)}>Play Track</button><p>{element.name}</p></div>
            } 
        </div>
    })



    const mappedArtists = artist.map((element,index)=>{
        
        return <div key={index} >
                     <h1>{element.name}</h1>
                     <img className='artistImg' src={element.images[0].url} />
            </div>
    })



    return (
        <div style={{position:"relative" }}>
        <Sound
        url={song}
        playStatus={Sound.status.PLAYING}
        />
            {mappedArtists}
            {mappedTracks}
        </div>
    )
}

export default Search
