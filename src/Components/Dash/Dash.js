import React, { Component } from 'react'
import axios from 'axios';


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

            </div>
        )
    }
}

export default Dash
