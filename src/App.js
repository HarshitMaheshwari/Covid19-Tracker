import React, { useEffect, useState } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';


function App() {
  const [countries, setCountries] = useState(['USA', 'UK', 'INDIA']);

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


  return (
    <div className="app">
      <div className='app_header'>
      <h1>Covid 19 Tracker</h1>
      <FormControl className='app_dropdown'>
        <Select
          variant='outlined'
          value='abc' 
        >
          {countries.map(country=>(
            <MenuItem value={country.value}>{country.name}</MenuItem>

          ))}
          
        </Select>

      </FormControl>
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
