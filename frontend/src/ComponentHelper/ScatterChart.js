import React, {
    Component
} from 'react'
import {
    Scatter,
    Chart
} from 'react-chartjs-2'



export default function VisualizationMap({
    airportsPoints,
    cloudsPoints,
    maxXPoint,
    maxYPoint
}) {
    var scatterData = [{
        label: 'Nuvens',
        borderColor: '#FF0000',
        backgroundColor: '#FFFFFF',
        data: cloudsPoints
    }, {
        label: 'Aeroportos',
        borderColor: '#0000FF',
        backgroundColor: '#FFFFFF',
        data: airportsPoints
    }]

    var scatterOption = {
        title:{
            display:true,
            text: 'posição inicial de nuvens e aeroportos'
        },
        responsive: true,
        maintainAspectRatio:true,
        scales: {
            yAxes: [{
                ticks: {
                    min:0,
                    max:maxYPoint,
                    stepSize:1
                }
            }],
            xAxes: [{
                ticks: {
                   min:0,
                   max:maxXPoint,
                   stepSize:1
                }
            }]

        }
    }

    return ( 
        <div >
        <Scatter 
        data = {{
            datasets: scatterData,
        }}
        options ={scatterOption}
        style={{height:'30%',width:'30%'}}
        />  
        </div>
    )
}