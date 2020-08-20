import React, { Component } from "react";
import {Bar} from 'react-chartjs-2';
import '../Chart/chart.scss'

class Chart extends Component {
    constructor(props){
        super(props);
        this.state={
            chartData:{

                labels:['Halsey','Drake', 'YoungBlood', 'Bono','BlakeShelton','ub40' ],
                datasets:[
                    {
                        label:'Stars',
                        data:[
                            5,
                            6,
                            1.5,
                            5.7,
                            7,
                            9
    
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
            }
        }
    }
   
  render() {
    return (
      <div className="chart">
        <Bar
        data={this.state.chartData}
        options={{
            title:{
                display:true,
                text:'Highest rated Artists',
                fontColor: 'black',
                

            },
            legend:{
                display:true,
                position:'left',
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
