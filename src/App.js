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
import { SortData, prettyPrintStat } from './util';
import 'leaflet/dist/leaflet.css';
import numeral from 'numeral';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(['worldwide']);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]); 
  const [mapCenter, setMapCenter] = useState({ lat: 34, lng: -40});
  const [casesType, setCasesType] = useState("cases");
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
      setMapZoom(2);

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
          <Infobox
              onClick={(e) => setCasesType("cases")}
              title="Coronavirus Cases"
              isRed
              active={casesType === "cases"}
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format("0.0a")}
            />
            <Infobox
              onClick={(e) => setCasesType("recovered")}
              title="Recovered"
              active={casesType === "recovered"}
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format("0.0a")}
            />
            <Infobox
              onClick={(e) => setCasesType("deaths")}
              title="Deaths"
              isRed
              active={casesType === "deaths"}
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format("0.0a")}
            />
        </div>

        <Map
          casesType={casesType} 
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
