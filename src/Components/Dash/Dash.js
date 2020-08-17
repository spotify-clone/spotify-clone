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

        console.log(albums)


        return (
            <div>
                <h1>Dash</h1>
            </div>
        )
    }
}

export default Dash
