import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function index() {
   const [data, setData] = useState();
   const responseData = async (pageNumber: Number) => {
    try {
      const response = await axios.get(
        `https://randomuser.me/api?page=${pageNumber}`
      );
      console.log(response.data); // console data
   
    } catch (err) {
      console.error(err);
    }
  };
   useEffect(()=>{
    const getData = setTimeout(() => {
        // console.log("API call");
        
        responseData(1);
    }, 300);
    return () => clearTimeout(getData);
   },[data]);

  return (
    <div>
        <TextField  onChange={(e:any)=>setData(e.target.value)} id="outlined-basic" label="Enter Name" variant="outlined" />
    </div>
  )
}

export default index