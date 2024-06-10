import {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setProvider } from '../Store/Slicer';
import '../css/SP.css';

export default function SelectLabels() {
  
  const droplist = useSelector((state)=>state.gasStore.droplist);
  const category = useSelector((state)=>state.gasStore.categorySelected);
  const provider = useSelector((state)=>state.gasStore.providerSelected);
  const dispatch = useDispatch();

  

  const handleCategory = (event) => {
    console.log(event.target.value);
    dispatch(setCategory(event.target.value));
    dispatch(setProvider("All"));
  };

  const handleProvider = (event) => {
    console.log(event.target.value);
    dispatch(setProvider(event.target.value));
  };

  
  const returnAllProviders = () => {
    const allProviders = [];
    Object.keys(droplist).forEach(cat => {
      droplist[cat].forEach(at => {
        if (!allProviders.includes(at["company"])) {
          allProviders.push(at["company"]);
        }
      });
    });
    return allProviders;
  };

  return (
    <div className='selects row'>
      <div className='service-category col-lg-3 col-md-4 col-sm-6'>
        <InputLabel><b>GAS Category</b></InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="select-Category"
          value={category}
          label="Category"
          onChange={handleCategory}
          className='w-100'
        >
          <MenuItem value={"All"}>
                All
          </MenuItem>
          {
            Object.keys(droplist).map((it,index)=>(
              <MenuItem value={it} key={index}>
                {it}
              </MenuItem>
            ))
          }
        </Select>
      </div>
      <div className='service-provider col-lg-3 col-md-4 col-sm-6'>
        <InputLabel><b>GAS Provider</b></InputLabel>
        <Select
        className='w-100'
          labelId='select-provider'
          id="select-provider"
          value={provider}
          onChange={handleProvider}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="All">
                All
          </MenuItem>
          {
            category == "All" ? 
            returnAllProviders().map((it,index)=>(
              <MenuItem value={it} key={index}>
                  {it}
              </MenuItem>
            ))
            :
            droplist[category]?.map((at,index) => (
              <MenuItem value={at["company"]} key={index}>
                {at["company"]}
              </MenuItem>
            ))
          }
        </Select>
      </div>
      {/* <div className='col-lg-6 col-md-4 col-sm-3 col-xs-0'></div> */}
    </div>
  );
}
