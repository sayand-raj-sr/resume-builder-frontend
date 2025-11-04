import { Box, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md"
import { deleteDownloadHistory, getHistoryAPI } from '../services/allAPI'



function History() {
 
  const[resume,setResume]=useState([]);

  const getHistory=async()=>{
    try{
      const result=await getHistoryAPI();
      // console.log(result);
      setResume(result.data)
      
    }
    catch(err){
      console.log(err);
      
    }
  }
 useEffect(()=>{
  getHistory()
 },[resume])
//  console.log(resume);

 const handleRemove=async(id)=>{
  try{
    await deleteDownloadHistory(id)
    getHistory();
  }catch(err){
    console.log(err);
    
  }
 }
 
  return (
    <div>
     <h1 className="text-center mt-5">Downloaded Resume History</h1>
     <Link to={'/'} style={{marginTop:'-50px'}} className='float-end me-5'>BACK</Link>
     <Box component='section' className='container-fluid'>
      <div className="row">
        { resume?.length>0?resume.map((item,index)=>(
          <div className="col-md-4" key={index}>
          <Paper elevation={3} sx={{my:5,p:5,textAlign:"center"}}>
            <div className="d-flex align-items-center justify-content-evenly">
              <h6>Review At: <br />{item?.timeStamp}</h6>
              <button onClick={()=>handleRemove(item?.id)} className='btn text-danger fs-4 ms-5'>
                <MdDelete />

              </button>

            </div>
            <div className="border rounded p-3">
              <img src={item?.imgUrl} alt="resume" className="img-fluid" /></div>

          </Paper>
        </div>
       )): <p>Nothing to Display</p>  
      }
      </div>
     </Box>
    </div>
  )
}

export default History
