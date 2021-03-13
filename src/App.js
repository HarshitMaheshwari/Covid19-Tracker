import React, { useEffect, useState } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import Infobox from './InfoBox';
import Map from './Map';
import { Card, CardContent } from '@material-ui/core';
import Table from './Table';
import { SortData } from './util';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]); 

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all').then((response) => response.json()).then((data) => {
      setCountryInfo(data);
    });
  },[]);

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries').then((response) => response.json()).then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2

          }));
        const sortedData = SortData(data);
        setCountries(countries);
        setTableData(sortedData);

      });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).then(response => response.json()).then(data => {
      setCountry(countryCode);
      setCountryInfo(data);

    });
  };

  console.log('country', countryInfo);

  return (
    <div className="app">
      <div className='app_left'>
        <div className='app_header'>
          <h1>Covid 19 Tracker</h1>
          <FormControl className='app_dropdown'>
            <Select
              variant='outlined'
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>

              ))}

            </Select>

          </FormControl>
        </div>


        <div className='app_stats'>
          <Infobox title='Coronavirus Cases' cases={countryInfo.todayCases} total={countryInfo.todayCases}></Infobox>
          <Infobox title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.todayRecovered}></Infobox>
          <Infobox title='Deaths' cases={countryInfo.todayDeaths} total={countryInfo.todayDeaths}></Infobox>


        </div>

        {/* header */}
        {/* title + select input dropdown */}

        {/* infoboxes */}
        {/* infoboxes */}
        {/* infoboxes */}



        {/* map */}
        <Map />

      </div>
      <Card className='app_right'>
        <CardContent>
          <h3> Live cases by country</h3>
          <Table countries={tableData}/>


          <h3> World wide new cases</h3>
        </CardContent>
        {/* table */}
        {/* graph */}

      </Card>
    </div>
  );
}

export default App;
