import React, { Component } from 'react'
import MyCarousel from './../Carousel/Carousel'
import axios from 'axios'


class Dash extends Component {
    constructor(props){
        super(props)

        this.state = {
            list: [],
            featuresList: [],
            playlist: []

        }

    };


    componentDidMount = () =>{
        this.getAlbums()
        this.getPlaylist()
        this.getFeatures()
    }

    getFeatures = () =>{
        axios.get('/api/features')
        .then(res =>{
            this.setState({featuresList: res.data})
        })
        .catch(error => console.log(error))

    }

    getPlaylist = () =>{
        axios.get('/api/playlist')
        .then(res=>{
                this.setState({playlist: res.data})

        })
        .catch(error => console.log(error))


    }


    getAlbums = () =>{
        axios.get('/api/albums')
        .then((res)=>{
            this.setState({list:res.data})

        })
        .catch(error =>{console.log(error)})
    }


    render() {
        const { list, playlist, featuresList } = this.state

        const mapped = list.map(element=>{
            return <img src={element.images[2].url}/>
        })
  

        const mappedFeatures = featuresList.map((element,index)=>{
            return <img key={index} src={element.icons[0].url} />
        })
    
    
        const mappedPlay = playlist.map((element,index)=>{
            return <div style={{width: "100vw"}} >
                    <img  style={{display: "flex", justifyContent:"center", height: "25vh", width: "25vw"}} key={index} src={element.images[0].url}/>
                </div>
        })

        console.log(mappedFeatures)


        return (
            <div>
         
                <MyCarousel list={list} />
                <span><h3>Album Hip-hop</h3></span>
                <MyCarousel list={list} />
                <span><h3>Album Study-Music</h3> </span>
                <MyCarousel  list={list} />
                <span><h3>Album Country</h3></span>
            </div>
        )
    }
}

export default Dash
