import { useState, useEffect } from 'react'
import {GetWeather} from '../services/Countries'

const RenderAllCountries = ({filter, filtered, setFilter}) =>{

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if(filtered && filtered.length === 1){
        GetWeather(filtered[0].name.common).then(response => setWeather(response.data)).catch(err => console.error("Weather load failed", err))
    }}, [filtered.length])

    let someVar = null;

    if(filtered.length > 10){
        return <p>Too many matches, specify another filter</p>;
    }else if(filtered.length === 1){ 
        someVar = <div>
        <h1>{filtered[0].name?.common}</h1>
        <p>Capital: {filtered[0].capital?.[0]}</p>
        <p>Area: {filtered[0].area}</p>
        <h2>Languages</h2>
        <ul>
            {Object.values(filtered[0].languages || {}).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={filtered[0].flags?.png} alt={`Flag of ${filtered[0].name?.common}`} />
        <h2>Weather in {filtered[0].capital?.[0]}</h2>
        <p>Temperature {weather?.main?.temp} Celsium</p>
        <img src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`} alt={`${weather?.weather?.main} icon`} />
        <p>Wind {weather?.wind?.speed} m/s</p>
        </div>
    }else{
        someVar = filtered.map(f => <div key={f.cca3}>
        <p>{f.name.common}</p>
        <button onClick={() => setFilter(f.name.common)}>Show</button>
        </div>)}

return (
    <div>
        {someVar}
    </div>
  )}

export default RenderAllCountries