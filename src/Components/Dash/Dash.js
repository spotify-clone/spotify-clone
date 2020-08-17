import React, { Component } from 'react'
import axios from 'axios';
import Carousel from './../Carousel/Carousel'


class Dash extends Component {
    constructor(props){
        super(props)

        this.state = {
            albums: []

        }

    };


    componentDidMount = () =>{
        this.getAlbums()
    }


    getAlbums = () =>{
        axios.get('/api/albums')
        .then((res)=>{
            this.setState({albums: res.data})
            console.log(res)
        })
        .catch(error =>{console.log(error)})
    }

 
        
        
        
        render() {
            const { albums } = this.state


        return (
            <div>
                <Carousel albums={albums} />
                <span><h3>Album Hip-hop</h3></span>
                <Carousel albums={albums} />
                <span><h3>Album Study-Music</h3> </span>
                <Carousel albums={albums} />
                <span><h3>Album Country</h3></span>


            </div>
        )
    }
}

export default Dash
