import React, { Component } from "react";
import {Bar} from 'react-chartjs-2';
import '../Chart/chart.scss'
import axios from 'axios';
//import { findByLabelText } from "@testing-library/react";

class Chart extends Component {
    constructor(props){
        super(props);
        this.state={
           
            labels:[],
            datasets:[
                {
                    label: 'Times Played',
                    backgroundColor:['blue','red','green','purple','black','yellow', 'pink', 'orange','white','navy','gold'],
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
                fontSize: 25,
                fontColor: 'white',
            },
          
            legend:{
                display:true,
                position:'bottom',
                labels:{
                    
                    display:true,
                    fontColor:'white'
                }
            },
            scales:{
                xAxes:[{
                    ticks:{
                        fontColor:'white',
                        fontSize: 15
                    }
                }],
                yAxes:[{
                    ticks:{
                        fontColor:"white",
                        fontSize: 20
                    }
                }]
            },
            label:{
                display:true,
                fontColor:'white'
            },
            
            
        }}
        />
      </div>
    );
  }
}

export default Chart;
