import React, { Component } from "react";
import {Bar} from 'react-chartjs-2';
import '../Chart/chart.scss'
import axios from 'axios';
class Chart extends Component {
    constructor(props){
        super(props);
        this.state={
           
            labels:[],
            datasets:[
                {
                    label: 'Times Played',
                    backgroundColor:['blue','red','green','purple','black','yellow'],
                    data:[]
                }
            ]

                
        }
    }
    componentDidMount(){
        this.getMp3Info()
    }
    getMp3Info=()=>{

        const { labels, datasets} = this.state

        let newLabels = [...labels];
        let newDatasets = [...datasets]

        axios.get('/api/tracks')
        .then(res=>{
                res.data.forEach(element=>{
                    newLabels.push(element.name)
                    newDatasets[0].data.push(element.count)
                    
                })
                this.setState({
                    labels: newLabels,
                    datasets: newDatasets
                })
        })
        .catch(error => console.log(error))
    }
    




    render() 
        {
            return (
                <div className="chart">
                 
        <Bar
        data={this.state}
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
            scales:{
                xAxes:[{
                    ticks:{
                        fontColor:'white',
                        fontSize: 20
                    }
                }],
                yAxes:[{
                    ticks:{
                        fontColor:"gold",
                        fontSize: 20
                    }
                }]
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
