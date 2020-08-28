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

        // console.log(featuresList)
        // console.log(list)

        
        return (
            <div className='main-div'>
         
                <span><h3>CATEGORIES</h3></span>
                <MyCarousel2  featuresList={featuresList} list={list} />
                <span><h3>WHAT'S YOUR MOOD?</h3> </span>
                <MyCarousel1 playlist={playlist} list={list} />
                <span><h3>FEATURES</h3></span>
                <MyCarousel list={list} />
            </div>
        )
    }
}

export default Dash;
