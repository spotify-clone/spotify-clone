import React, { Component } from 'react'
import MyCarousel from './../Carousel/Carousel'
import MyCarousel1 from './../Carousel/Carousel1'
import MyCarousel2 from './../Carousel/Carousel2'
import axios from 'axios'
import '../Dash/dash.scss'



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
        axios.get('/api/new-releases')
        .then((res)=>{
            this.setState({list:res.data})

        })
        .catch(error =>{console.log(error)})
    }


    render() {
        const { list, playlist, featuresList } = this.state

        
        return (
            <div className='main-div'>
         
                <span><h3>CATIGORIES</h3></span>
                <MyCarousel2  featuresList={featuresList} list={list} />
                <span><h3>STUDY MUSIC</h3> </span>
                <MyCarousel1 playlist={playlist} list={list} />
                <span><h3>HIP-HOP</h3></span>
                <MyCarousel list={list} />
            </div>
        )
    }
}

export default Dash;
