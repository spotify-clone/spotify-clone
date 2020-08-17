import React, { Component } from 'react'
import Carousel from './../Carousel/Carousel'


class Dash extends Component {


    render() {
        return (
            <div>
                <Carousel />
                <span><h3>Album Hip-hop</h3></span>
                <Carousel />
                <span><h3>Album Study-Music</h3> </span>
                <Carousel />
                <span><h3>Album Country</h3></span>

            </div>
        )
    }
}

export default Dash
