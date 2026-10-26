import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';
export default function SearchBox({updateInfo})

{
    const API_URL ="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "94b531516f764c9f3a574cba68ed1d9a";
 
     let getWeatherInfo = async()=>{

        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonRes = await  response.json();
        
        let result = {

            temp: jsonRes.main.temp,
            tempMin: jsonRes.main.temp_min,
            tempMax: jsonRes.main.temp_max,
            humid: jsonRes.main.humidity,
            name: jsonRes.name,
            pressure: jsonRes.main.pressure,
            lat: jsonRes.coord.lat,
            lon: jsonRes.coord.lon,
            weather: jsonRes.weather[0].description,


        }
        console.log(result);
        return result;
     }

    let [city,setCity] = useState("Hyderabad");

    let handleChange = (evt)=>{
        setCity(evt.target.value)

    }

    let handleSubmit = async (evt)=>{
        evt.preventDefault();
        //console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
    }
    return(
        <div className='SearchBox'>
            
            <form action="" onSubmit={handleSubmit}>
                 <TextField id="city" label="Enter The City" variant="outlined" size='small' required value={city} onChange={handleChange}/> &nbsp;
            <Button variant="contained" type='submit' >Search</Button>
            </form>
        </div>
    );
}
