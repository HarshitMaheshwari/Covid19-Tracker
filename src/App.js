import React, { useState } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';


function App() {
  const [countries, setCountries] = useState([
    'USA', 'UK', 'INDIA'
  ]);
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
            <MenuItem value={country}>{country}</MenuItem>

          ))}

          {/* <MenuItem value='worldwide'>Worldwide</MenuItem>
          <MenuItem value='worldwide'>OPtion two</MenuItem>
          <MenuItem value='worldwide'>Option 3</MenuItem>
          <MenuItem value='worldwide'>Option 4</MenuItem> */}


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
