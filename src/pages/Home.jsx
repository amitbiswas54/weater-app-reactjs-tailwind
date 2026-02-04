import React, { useState } from 'react'
import { images } from '../assets/Images'
import axios from 'axios';
import { weatherTimeFormat } from '../helper/Helper';

function Home() {

    let { bgImage, clear, humidity, wind, thunder, cloudy, rainy, smoke } = images;

const weatherIcons = {
    Clear: clear,
    Thunderstorm: thunder,
    Clouds: cloudy,
    Rain: rainy,
    Drizzle: cloudy,
    Mist: cloudy,
    Haze: cloudy,
    Smoke: cloudy
  };

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState();
    const [temperature, setTemperature] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [humidityLevel, setHumidityLevel] = useState(0);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [timeSet, setTimeSet] = useState({});



    const handelChange = async (e) => {
        e.preventDefault();

      function kelvintemp(value){
        return value ;
      }

       await axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=610d5ac5affff7a18f53903468151e7a`)
        .then(response => {
            if (response.status === 200) {
              let temp = response.data.main.temp;
              let tempFinalvalue = kelvintemp(temp).toFixed(0);

              setTemperature(tempFinalvalue);
              setWindSpeed(response.data.wind.speed);
              setHumidityLevel(response.data.main.humidity);
              let timeValue = weatherTimeFormat(response.data.sys.sunrise, response.data.sys.sunset);
              setTimeSet(timeValue)
              setWeather(response.data.weather[0].main);
              console.log("Weather data:", response.data);
        }
    })
        .catch(error => {
            console.error("Error fetching the weather data", error);
        });
       

    }




  return (
    <>
 <div className="flex flex-col gap-4 justify-center items-center ">
  <div>
    <div className='mt-4'>
        <form action="">
            <div className='flex'>
              <input
                    type="text"
                    placeholder="Search city..."
                    className="px-4 py-2 border bg-white 
                    rounded-l-xl outline-none focus:ring-2 focus:ring-green-700"
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    />
            <button type="submit"
            onClick={handelChange}
      className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-r-xl hover:bg-gray-950">Search</button>
            </div>
        </form>
    </div>
  </div>
<div className="max-w-[450px] w-[350px] p-10 mb-5 border-green-700 border-2 
                rounded-2xl text-white  bg-cover bg-center relative">

  <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
  <div className='relative z-10'>
    <div className='flex flex-col gap-2 '>
  <h2 className='text-3xl font-bold text-center text-green-400'>{city? city.toUpperCase(): 'Enter City'}</h2>
  <div>

{weather && (
          <img
            src={
              weather=== 'Clear' ? images.clear :
              weather === 'Thunderstorm' ? images.thunder :
              weather === 'Clouds' ? images.cloudy :
              weather === 'Rain' ? images.rainy :
              weather === 'Drizzle' ? images.cloudy :
              weather === 'Mist' ? images.cloudy :
              weather === 'Haze' ? images.cloudy :
              weather === 'Smoke' ? images.cloudy :
              null
             }
            alt={weather}
            className="w-32 h-32 mx-auto my-2"
          />
        )} 
  </div>
  </div>

  <div className='flex justify-between items-center text-white text-sm'>
    <div>Sunrise - {timeSet.sunriseTime}</div>
     <div>Sunset - {timeSet.sunsetTime}</div>
  </div>
    <h2 className='text-center text-6xl py-4 font-bold my-2 text-green-200'>{temperature}<sup className='font-sm'>o</sup>c</h2>
    <p className='font-medium text-base text-center font-semibold'>{weather} - {timeSet.timeInIST}</p>    
    <div className='flex justify-around items-center mt-4 '>
        <div className='flex flex-col gap-2 justify-center items-center'>
            <img src={humidity} alt="" className='w-10'/>
            <p className='text-center  text-md'>H - {humidityLevel}%</p>
        </div>
         
         <div className='flex flex-col gap-2 justify-center items-center'>
            <img src={wind} alt="" className='w-10' /> 
            <p className='text-center text-md'>W - {windSpeed} km/h</p>
        </div>

    </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Home