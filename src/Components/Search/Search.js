import React, {useState, useEffect}from 'react'
import axios from 'axios'
import '../Search/search.scss';
import Sound from 'react-sound';
import { Button } from 'semantic-ui-react'


const Search = (props) => {
    const [artist, setArtist] = useState([])
    const [tracks, setTracks] = useState([])
    const [albums, setAlbums] = useState([])

    //song's value will be the selected track the user wants to listen to
    const [ song , setSong] = useState('');

    //artist = [ 'drake'] == artist.length  = 1


    const Button = () => (
        <Button.Group>
          <Button icon='play' />
          <Button icon='pause' />
          <Button icon='shuffle' />
        </Button.Group>
      )

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
                            axios.get(`/api/artist-album/${element.id}`)
                            .then(res =>{
                                setAlbums(res.data)
                            })
                        })
                    }
                })
            }

        })
        .catch((err)=> console.log(err));

    }
    
    const mappedAlbums = albums.map((element,index)=>{

        return<div className='albums' key={index}>
            <img className='albumImg' src={element.images[1].url} alt='no pic available'/>
            <p>{element.name}</p>
        </div>
    })





    const mappedArtists = artist.map((element,index)=>{

        return <div className='artist' key={index} >
                      <h3>{element.name} </h3>
                     <img className='artistImg' src={element.images[2].url} alt='no pic available'/>
            </div>
    })



    const mappedTracks = tracks.map((element,index)=>{
        let audio;
    
        //condition to filter out any null or undefined values --> not working for some reason
        if(element.preview_url !== null || element.preview_url !== undefined){
            audio = element.preview_url
        }


        //buttons to control which track to play
        return <div className='trackList'key={index}>
             <Button icon='pause' content='Pause' onClick={() => setSong('')}/><div><p>{element.name}</p></div>
            <Button  icon='play' content='Play' onClick={() => setSong(audio)}/><div><p>{element.name}</p></div>
        </div>
    })

    return (
        <div className='mainDiv'>
            <Sound
            url={song}
            playStatus={Sound.status.PLAYING}
            />
            <div>
                {mappedArtists}
                <p>SONGS</p>
                <div className='track-box'>
                    {mappedTracks}
                </div>
                <div className='album-box'>
                    <p>Albums</p>
                    {mappedAlbums}
                </div>
            </div>
        </div>

    )
}

export default Search
