import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaEdit } from "react-icons/fa";
import { TextField } from '@mui/material';
import { RxCross1 } from "react-icons/rx";
import { editResumeAPI, getResumeAPI } from '../services/allAPI';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Edit({ resumeId,setUpdateResume }) {
  console.log(resumeId);

  const [userInput, setUserInput] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [userSkill, setUserSkill] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //getEditResumeDetails
  const getEditResumeDetails = async () => {
    try {
      const result = await getResumeAPI(resumeId);
      setUserInput(result?.data)

    } catch (err) {
      console.log(err);

    }
  }
  React.useEffect(() => {
    resumeId && getEditResumeDetails()
  }, [resumeId])
  console.log(userInput);

   const addSkill = () => {
    if (userSkill) {
      if (userInput.skills.includes(userSkill)) {
        alert("skill already exist...please add another")
      }
      else {
        setUserInput({ ...userInput, skills: [...userInput.skills, userSkill] })
      }

    }
    setUserSkill("")
  }

   // remove skill

  const removeSkill = (skill) => {
    setUserInput({ ...userInput, skills: userInput.skills.filter(item => item !== skill) })
  }


   const handleUpdateResume=async()=>{

    try{
      const result=await editResumeAPI(userInput?.id,userInput)
      console.log(result);
      handleClose()
      setUpdateResume(result?.data)
        swal("Success", "Resume Updatted", "success");
    }
    catch(err){
      console.log(err);
      
    }
  }  

  return (
    <div>
      <button onClick={handleOpen} className='btn text-primary fs-2'><FaEdit /></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* personal details */}
            <h3>Personal Details</h3>
            <div className="d-flex row p-3">
              <TextField id="standard-basic" label="Full Name" variant="standard"
                onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, name: e.target.value } })}
                value={userInput.personalDetails?.name} />
              <TextField id="standard-basic" label="Job Title" variant="standard"
                onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, jobTitle: e.target.value } })}
                value={userInput.personalDetails?.jobTitle} />
              <TextField id="standard-basic" label="Location" variant="standard"
                onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, location: e.target.value } })}
                value={userInput.personalDetails?.location} />
            </div>

            {/* Contact Details */}
            <h3>Contact Details</h3>
            <div className="d-flex row p-3">
              <TextField id="standard-basic" label="Email" variant="standard"
                onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, email: e.target.value } })}
                value={userInput.personalDetails?.email} />
              <TextField id="standard-basic" label="Phone Number" variant="standard"
                onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, phone: e.target.value } })}
                value={userInput.personalDetails?.phone} />
              <TextField id="standard-basic" label="Github Profile Link" variant="standard"
                onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, github: e.target.value } })}

                value={userInput.personalDetails?.github} />
              <TextField id="standard-basic" label="LinkedIn Profile Link" variant="standard"
                onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, linkedIn: e.target.value } })}

                value={userInput.personalDetails?.linkedIn} />
              <TextField id="standard-basic" label="Portfolio Profile Link" variant="standard"
                onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, portfolio: e.target.value } })}
                value={userInput.personalDetails?.portfolio}
              />
            </div>

            {/* Educational Details */}
            <h3>Educational Details</h3>
            <div className="d-flex row p-3">
              <TextField id="standard-basic" label="Course Name" variant="standard"
                onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, course: e.target.value } })}
                value={userInput.education?.course} />
              <TextField id="standard-basic" label="Collage Name" variant="standard"
                onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, Collage: e.target.value } })}
                value={userInput.education?.Collage} />
              <TextField id="standard-basic" label="University " variant="standard"
                onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, university: e.target.value } })}
                value={userInput.education?.university} />
              <TextField id="standard-basic" label="Year of Passout " variant="standard"
                onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, year: e.target.value } })}
                value={userInput.education?.year} />

            </div>
            {/*Professional Details  */}
            <h3>Professional Details</h3>
            <div className="d-flex row p-3">
              <TextField id="standard-basic" label="Job or Internship" variant="standard"
                onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, job: e.target.value } })}
                value={userInput.experience?.job} />
              <TextField id="standard-basic" label="Company Name" variant="standard"
                onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, company: e.target.value } })}
                value={userInput.experience?.company} />
              <TextField id="standard-basic" label="Location " variant="standard"
                onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, location: e.target.value } })}
                value={userInput.experience?.location} />
              <TextField id="standard-basic" label="Duration " variant="standard"
                onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, duration: e.target.value } })}
                value={userInput.experience?.duration} />

            </div>
            {/* skills */}
            <h3>Skills</h3>

            <div spacing={2} className='d-flex flex-wrap align-items-center justify-content-center'>
              <TextField id="standard-basic" label="Add Skill" variant="standard"
                onChange={e => setUserSkill(e.target.value)} value={userSkill} />
              <Button variant="text" className='me-3 mt-4' sx={{ maxWidth: "40px" }}
              onClick={addSkill}>Add</Button>


            </div>
            {/* added skill */}
            <h5>Added Skills:</h5>
            <div className="d-flex align-items-center justify-content-start flex-wrap m-2">
              {userInput?.skills?.length > 0 && userInput?.skills?.map(skill => (<span className='btn btn-primary mt-3 ms-3 d-flex align-items-center justify-content-center'>
                {skill} <button className='btn text-light fs-5' onClick={()=>removeSkill(skill)}><RxCross1 /></button>
              </span>))}
            </div>
            {/* summary */}
            <h3>Professional Summary</h3>
            <div className="d-flex row p-3">
              <TextField id="standard-basic" label="Write a short summary of yourself"
                multiline rows={4}
               
                variant="standard" value={userInput.summary} 
                onChange={e => setUserInput({ ...userInput, summary: e.target.value })}/>


            </div>
            <Button onClick={handleUpdateResume}>Update</Button>


          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Edit
