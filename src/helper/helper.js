export const weatherTimeFormat =(sunrise, sunset)=>{
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);
    let now = new Date();
 
    const options = { 
     timeZone: 'asia/Kolkata',
     hour: '2-digit', 
     minute: '2-digit',
     hour12: true
    };

    const sunriseTime = sunriseDate.toLocaleTimeString('en-US', options);
    const sunsetTime = sunsetDate.toLocaleTimeString('en-US', options);
    const timeInIST = now.toLocaleTimeString('en-US', options);

  
    console.log("Sunrise Time:", sunriseTime);
    console.log("Sunset Time:", sunsetTime);
    console.log('Time', timeInIST);

   
    return {sunriseTime, sunsetTime, timeInIST};
}