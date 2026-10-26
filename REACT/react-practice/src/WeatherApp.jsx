import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import { useState } from "react";
export default function WeatherApp()
{

    const [weatherInfo,setWeatherInfo] = useState({
        temp: 25.45,
        tempMin: 21,
        tempMax: 26.8,
        humid: 47,
        weather: "haze",
        name:"Nalgonda"
    });

    let updateInfo = (result)=>{
        setWeatherInfo(result);
    }
    return(
        <div style={{textAlign:"center"}}>
            <h1>Weather App </h1>
            <SearchBox updateInfo = {updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}