import React, { useState, useEffect } from 'react';
import InputSlider from './ComponentHelper/slider'
import VisualizationMap from './ComponentHelper/ScatterChart'

function App() {
  const [airports, setAirports] = useState(3);
  const [clouds, setClouds] = useState(4);
  const [gridWidth, setWidth] = useState(10);
  const [gridHeight, setHeight] = useState(10);
  const [daysForFirst, setDaysForFirst] = useState(0);
  const [daysForLast, setDaysForLast] = useState(0);
  const [airportsDataset, setAirportsDataSet] = useState([]);
  const [cloudsDataset, setCloudsDataSet] = useState([]);

  async function calculate(sendObj){
    
    const response =await fetch('http://localhost:3030/calculateDays',
        { 
          method: 'POST',
          body: JSON.stringify(sendObj),
          headers:{
            "Content-Type": "application/json"
          }
        }
      );
      const data = await response.json();

      setDaysForFirst(data.daysToCover.oneAirportDays);
      setDaysForLast(data.daysToCover.allAirportsDays);
      setAirportsDataSet(data.initialCoordSet.airportsCoord);
      setCloudsDataSet(data.initialCoordSet.cloudsCoord);
  }

  useEffect(() =>{
    calculate({
        airportsQtd:airports,
        cloudsQtd:clouds,
        maxYRange:gridHeight,
        maxXRange:gridWidth
      });
  },[airports,clouds,gridHeight,gridWidth]);

  return (
    <div className="App">
        <div id="inputsSection" className="d-flex justify-content-center">
          <InputSlider 
            sliderValue={airports} 
            sliderTitle="Aeroportos" 
            minValue ={3}
            handleSliderChange={(event, newValue) => {
              if(newValue <3) newValue = 3;
              setAirports(newValue);
            }}
            handleInputChange ={(event) => {
              setAirports(event.target.value === '' ? '' : Number(event.target.value));
            }}
          />
          <InputSlider 
            sliderValue={clouds} 
            sliderTitle="Nuvens" 
            minValue ={4}
            handleSliderChange={(event, newValue) => {
              if(newValue <4) newValue = 4;
              setClouds(newValue);
            }}
            handleInputChange ={(event) => {
              setClouds(event.target.value === '' ? '' : Number(event.target.value));
            }}
          />
          <InputSlider 
            sliderValue={gridHeight} 
            sliderTitle="Altura" 
            minValue ={10}
            handleSliderChange={(event, newValue) => {
              if(newValue <10) newValue = 10;
              setHeight(newValue);
            }}
            handleInputChange ={(event) => {
              setHeight(event.target.value === '' ? '' : Number(event.target.value));
            }}
          />
          <InputSlider 
            sliderValue={gridWidth} 
            sliderTitle="Largura" 
            minValue ={10}
            handleSliderChange={(event, newValue) => {
              if(newValue <10) newValue = 10;
              setWidth(newValue);
            }}
            handleInputChange ={(event) => {
              setWidth(event.target.value === '' ? '' : Number(event.target.value));
            }}
          />
        </div> 
        <br />
        <div style={{height:'70%', width:'70%'}}>
          <VisualizationMap 
            airportsPoints={airportsDataset} 
            cloudsPoints={cloudsDataset}
            maxXPoint = {gridWidth}
            maxYPoint = {gridHeight}
            />
          </div>
          <br/>
          <div>
          <h1>Em {daysForFirst} dias o primeiro aeroporto será coberto(Contando o dia inicial)</h1>
            <h1>Em {daysForLast} dias todos os aeroportos serão cobertos(Contando o dia inicial)</h1>
          </div>
    </div>
  );
}

export default App;
