import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FaFileDownload } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Edit from './Edit';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { addDownloadHistoryAPI } from '../services/allAPI';


function Preview({ userInput, finish,resumeId,setUserInput }) {
  console.log(userInput);

 const[downloadStatus,setDownloadStatus]=useState(false)
  const downloadCv=async()=>{

    // gerElement for screenshot
    const input=document.getElementById("result");
    const canvas=await html2canvas(input,{scale:2});
    const imgUrl=canvas.toDataURL('image/png')

    const pdf=new jsPDF()
    const pdfWidth=pdf.internal.pageSize.getWidth();
    const pdfHeight=pdf.internal.pageSize.getHeight();
    pdf.addImage(imgUrl,'PNG',0,0,pdfWidth,pdfHeight);
    pdf.save('resume.pdf')

    //getdate

    const localTimeDate=new Date();
    const timeStamp=`${localTimeDate.toLocaleDateString()},${localTimeDate.toLocaleTimeString()}`

    try{
      const result=await addDownloadHistoryAPI({...userInput,imgUrl,timeStamp})
      console.log(result);
      setDownloadStatus(true)
      
    }
    catch(err){
      console.log(err);
      
    }

  }

  return (
    <div>
      <div style={{ marginTop: '50px' }}>
         {userInput.personalDetails.name  &&
         <div className="flex-column">

     { finish && <div className="d-flex justify-content-end align-items-center">
      {/* download */}
      <button onClick={downloadCv} className='btn fs-3 text-primary'><FaFileDownload /></button>
      {/* edit */}
      <div>

        <Edit resumeId={resumeId}  setUpdateResume={setUserInput}/>
      </div>
      {/* history */}
  { downloadStatus && <>
       <Link to={'/history'} className='btn fs-3 text-primary'><FaHistory /></Link>
   </>}
      {/* back */}
      <Link to={'/resume-generator'} className='btn text-primary'>BACK</Link>
    </div>}
        <Box>
            <Paper elevation={7} id="result">

              <Typography variant="h4" align="center" component="h2">
                Name: {userInput.personalDetails.name}
              </Typography>
              <Typography variant="subtitle" align="center" color="blue">
                <p>job title: {userInput.personalDetails.jobTitle}</p>
              </Typography>
              <Typography variant="body2" align="center">
                {userInput.personalDetails.location} | {userInput.personalDetails.email} | {userInput.personalDetails.phone}
              </Typography>
              <Typography variant="body2" align="center" mb={4}>
                <Link href={userInput.personalDetails.github} target="_blank">Github</Link>|
                <Link href={userInput.personalDetails.linkedIn} target="_blank">LinkedIn</Link>|
                <Link href={userInput.personalDetails.portfolio} target="_blank">Portfolio</Link>

              </Typography>
              <Divider>Summary</Divider>
              <Typography mb={3} align='center' noWrap='false'>
                {userInput.summary}
              </Typography>
              <Divider>Education</Divider>
              <Typography variant="h6" align="center">
                <h5>{userInput.education.course}</h5>
              </Typography>
              <Typography variant="body2" align="center" mb={4}>
                <p><span>{userInput.education.Collage}</span>|
                  <span>{userInput.education.university}</span>|
                  <span>{userInput.education.year}</span></p>
              </Typography>
              <Divider>Professional Expereince</Divider>
              <Typography variant="h6" align="center">
                <h5>{userInput.experience.job}</h5>
              </Typography>
              <Typography variant="body2" align="center" mb={4}>
                <p><span>{userInput.experience.company}</span>|
                  <span>{userInput.experience.location}</span>|
                  <span>{userInput.experience.duration}</span></p>
              </Typography>
              <Divider>Skills</Divider>
              <div style={{marginLeft:"150px"}}>
              <Stack spacing={2} direction="row" sx={{ flexWrap: 'wrap', gap: '10px', padding: '10px' }}>
                {userInput.skills.map(skill => (

                  <Button variant="contained">{skill}</Button>))
                }

              </Stack>
              </div>
              </Paper>  
        </Box>
         </div>
        
         }
      </div>
    </div>
  )
}

export default Preview
