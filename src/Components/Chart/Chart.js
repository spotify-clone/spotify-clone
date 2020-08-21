import React, { Component } from "react";
import {Bar} from 'react-chartjs-2';
import '../Chart/chart.scss'
import axios from 'axios';
class Chart extends Component {
    constructor(props){
        super(props);
        this.state={
            tracks:{},
            chartData:{}

                
        }
    }
    componentDidMount(){
        this.getMp3Info()
    }
    getMp3Info=()=>{
        axios.get('/api/tracks')
        .then(res=>{
            if(res.data && res.data.length !== this.state.tracks.length){
                this.setState({tracks: res.data})
                const {tracks} = this.state
                const mappedTracksName = tracks.map((element,index)=>{
                    console.log(element.name)
                    return element.name 
                })
                const mappedTrackData = tracks.map((element, index)=>{
                    return element.count
                })
                {console.log(mappedTrackData.join(' '))}
                this.setState({chartData:{
                    labels:[mappedTracksName],
                datasets:[
                    {
                        label:'Times Played',
                        data:[
                           mappedTrackData
    
                        ],
                        backgroundColor:[
                            'blue',
                            'red',
                            'green',
                            'purple',
                            'black',
                            'yellow',
                        ]
                    }
                ]
            } })

            }
        })
        .catch(error => console.log(error))
    }
    


    render() 
        {
            return (
                <div className="chart">
                 
        <Bar
        data={this.state.chartData}
        options={{
            title:{
                display:true,
                text:'Most Listen to Artists',
                fontColor: 'black',
                

            },
            legend:{
                display:true,
                position:'right',
                labels:{
                    display:true,
                    fontColor:'black'
                }
            },
            label:{
                display:true,
                fontColor:'black'
            },
            
        }}
        />
      </div>
    );
  }
}

export default Chart;
