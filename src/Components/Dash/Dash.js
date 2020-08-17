import React, { Component } from 'react'
import MyCarousel from './../Carousel/Carousel'
import axios from 'axios'


class Dash extends Component {
    constructor(props){
        super(props)

        this.state = {
            list: []

        }

    };


    componentDidMount = () =>{
        this.getAlbums()
    }


    getAlbums = () =>{
        axios.get('/api/albums')
        .then((res)=>{
            this.setState({list:res.data})

        })
        .catch(error =>{console.log(error)})
    }


    render() {
        const { list } = this.state

        // const mapped = list.map(element=>{
        //     return <img src={element.images[2].url}/>
        // })



        // const  data  = {...list.albums}
        // const [{...items }] = data
        // console.log(items)


        // const { albums } = list
        // const object = {...albums}
        // const array = {...object.items}
  




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
