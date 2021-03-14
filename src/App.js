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
import LineGraph from './LineGraph';
import { SortData } from './util';
import 'leaflet/dist/leaflet.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]); 
  const [mapCenter, setMapCenter] = useState({ lat: 34, lng: -40});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]); 

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
        setMapCountries(data);
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
      setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
      setMapZoom(4);

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
        <Map 
        countries = {mapCountries}
        center = {mapCenter}
        zoom = {mapZoom}
        />

      </div>
      <Card className='app_right'>
        <CardContent>
          <h3> Live cases by country</h3>
          <Table countries={tableData}/>


          <h3> World wide new cases</h3>
          <LineGraph/>
        </CardContent>
        {/* table */}
        {/* graph */}

      </Card>
    </div>
  );
}

export default App;
