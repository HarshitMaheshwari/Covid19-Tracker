import React, { useEffect, useState } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import Infobox from './InfoBox';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide'])

  useEffect(() => {

    const getCountriesData = async() => {
      await fetch('https://disease.sh/v3/covid-19/countries').then((response) => response.json()).then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2

          }));
          setCountries(countries);

      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  } 


  return (
    <div className="app">
      <div className='app_header'>
      <h1>Covid 19 Tracker</h1>
      <FormControl className='app_dropdown'>
        <Select
          variant='outlined'
          onChange={onCountryChange}
          value={country} 
        >
          <MenuItem value='worldwide'>Worldwide</MenuItem>
          {countries.map(country=>(
            <MenuItem value={country.value}>{country.name}</MenuItem>

          ))}

        </Select>

      </FormControl>
      </div> 
      

      <div className='app_stats'>
        <Infobox title='Coronavirus Cases' cases ={1234} total={3000}></Infobox>
        <Infobox title='Recovered' cases ={123} total={2000}></Infobox>
        <Infobox title='Deaths' cases ={12323} total={2000}></Infobox>


      </div>

      {/* header */}
      {/* title + select input dropdown */}

      {/* infoboxes */}
      {/* infoboxes */}
      {/* infoboxes */}

      {/* table */}
      {/* graph */}

      {/* map */}
    </div>
  );
}

export default App;
