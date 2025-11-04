import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { RxCross1 } from "react-icons/rx";
import { useFormik } from 'formik';
import { addResumeAPI } from '../services/allAPI';
import swal from 'sweetalert';
import { validationSchemas } from '../schemas'

function Steps({ userInput, setUserInput, setFinish,setResumeId }) {
  // console.log(userInput);


  const steps = ['Basic Information', 'Contact Details', "Education Details", 'Work Experience', "Skills & Certification"
    , 'Review & Submit'];

  const suggestionSkills = ['REACT', 'ANGULAR', 'NODE', 'EXPRESS', 'MONGODB', 'JAVASCRIPT', 'GIT', 'UI/UX']
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const userSkillRef = React.useRef()


  const isStepOptional = (step) => {
    return step === 1;
  };
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  //Add skill
  const addSkill = (inputSkill) => {
    if (inputSkill) {
      if (userInput.skills.includes(inputSkill)) {
        alert("skill already exist...please add another")
      }
      else {
        setUserInput({ ...userInput, skills: [...userInput.skills, inputSkill] })
      }
    }
  }

  // remove skill

  const removeSkill = (skill) => {
    setUserInput({ ...userInput, skills: userInput.skills.filter(item => item != skill) })
  }

  
  

  //useformik
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: userInput,
    enableReinitialize: true,
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values, actions) => {
      console.log(values);
      // actions.resetForm();
      setUserInput(values);
      handleNext();


    }
  })
  console.log(errors);



  const renderStepContent = (step) => {
    switch (step) {
      case 0: return (
        <div>
          <h3>Personal Details</h3>
          <div className="d-flex row p-3">
            <TextField id="standard-basic" label="Full Name" variant="standard"
              onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, name: e.target.value } })}
              value={values.personalDetails.name} onBlur={handleBlur} name="personalDetails.name" />
            {/* <TextField
              label="Full Name"
              variant="standard"
              name="personalDetails.name"
              value={values.personalDetails.name}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />  */}
            <div className="error-container">
              {errors.personalDetails?.name && touched.personalDetails?.name && (
                <p className="form-error text-danger">{errors.personalDetails.name}</p>
              )}
            </div>
            <TextField id="standard-basic" label="job Title" variant="standard"
              onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, jobTitle: e.target.value } })}
              value={values.personalDetails.jobTitle} onBlur={handleBlur} name="personalDetails.jobTitle" />
            <div className="error-container">
              {errors.personalDetails?.jobTitle && touched.personalDetails?.jobTitle && (
                <p className="form-error text-danger">{errors.personalDetails.jobTitle}</p>
              )}
            </div>

            {/* <TextField
              label="location"
              variant="standard"
              name="personalDetails.location"
              value={values.personalDetails.location}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            /> 
          <div className="error-container">
  {errors.personalDetails?.location && touched.personalDetails?.location && (
    <p className="form-error text-danger">{errors.personalDetails.location}</p>
  )}
</div> */}

            <TextField id="standard-basic" label="Location" variant="standard"
              onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, location: e.target.value } })}
              name="personalDetails.location"
              value={values.personalDetails.location}
              onBlur={handleBlur} />
            <div className="error-container">
              {errors.personalDetails?.location && touched.personalDetails?.location && (
                <p className="form-error text-danger">{errors.personalDetails.location}</p>
              )}
            </div>
          </div>
        </div>
      )

      
      case 1: return (
        <div>
          <h3>Contact Details</h3>
          <div className="d-flex row p-3">
            <TextField id="standard-basic" label="Email" variant="standard"
              onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, email: e.target.value } })}
              value={values.personalDetails.email}
              name="personalDetails.email"
              onBlur={handleBlur} />
            <div className="error-container">
              {errors.personalDetails?.email && touched.personalDetails?.email && (
                <p className="form-error text-danger">{errors.personalDetails.email}</p>
              )}
            </div>
            <TextField id="standard-basic" label="Phone Number" variant="standard"
              onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, phone: e.target.value } })}
              name="personalDetails.phone"
              value={values.personalDetails.phone}
              onBlur={handleBlur} />
            <div className="error-container">
              {errors.personalDetails?.phone && touched.personalDetails?.phone && (
                <p className="form-error text-danger">{errors.personalDetails.phone}</p>
              )}
            </div>
            <TextField id="standard-basic" label="Github Profile Link" variant="standard"
              onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, github: e.target.value } })}
              name="personalDetails.github"
              value={values.personalDetails.github}
              onBlur={handleBlur} />
            <div className="error-container">
              {errors.personalDetails?.github && touched.personalDetails?.github && (
                <p className="form-error text-danger">{errors.personalDetails.github}</p>
              )}
            </div>

            <TextField id="standard-basic" label="LinkedIn Profile Link" variant="standard"
              onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, linkedIn: e.target.value } })}
              name="personalDetails.linkedIn"
              value={values.personalDetails.linkedIn}
              onBlur={handleBlur}
            />
            <div className="error-container">
              {errors.personalDetails?.linkedIn && touched.personalDetails?.linkedIn && (
                <p className="form-error text-danger">{errors.personalDetails.linkedIn}</p>
              )}
            </div>

            <TextField id="standard-basic" label="Portfolio Profile Link" variant="standard"
              onChange={e => setUserInput({ ...userInput, personalDetails: { ...userInput.personalDetails, portfolio: e.target.value } })}
              name="personalDetails.portfolio"
              value={values.personalDetails.portfolio}
              onBlur={handleBlur} />
            <div className="error-container">
              {errors.personalDetails?.portfolio && touched.personalDetails?.portfolio && (
                <p className="form-error text-danger">{errors.personalDetails.portfolio}</p>
              )}
            </div>

          </div>
        </div>
      )
      case 2: return (
        <div>
          <h3>Educational Details</h3>
          <div className="d-flex row p-3">
            <TextField id="standard-basic" label="Course Name" variant="standard"
              onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, course: e.target.value } })}
              name="education.course"
              value={values.education.course}
              onBlur={handleBlur} />

            <div className="error-container">
              {errors.education?.course && touched.education?.course && (
                <p className="form-error text-danger">{errors.education.course}</p>
              )}
            </div>

            <TextField id="standard-basic" label="Collage Name" variant="standard"
              onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, Collage: e.target.value } })}
              name="education.Collage"
              value={values.education.Collage}
              onBlur={handleBlur} />
            <div className="error-container">
              {errors.education?.Collage && touched.education?.Collage && (
                <p className="form-error text-danger">{errors.education.Collage}</p>
              )}
            </div>

            <TextField id="standard-basic" label="University " variant="standard"
              onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, university: e.target.value } })}
              name="education.university"
              value={values.education.university}
              onBlur={handleBlur} />
            <div className="error-container">
              {errors.education?.university && touched.education?.university && (
                <p className="form-error text-danger">{errors.education.university}</p>
              )}
            </div>

            <TextField id="standard-basic" label="Year of Passout " variant="standard"
              onChange={e => setUserInput({ ...userInput, education: { ...userInput.education, year: e.target.value } })}
              name="education.year"
              value={values.education.year}
              onBlur={handleBlur} />
            <div className="error-container">
              {errors.education?.year && touched.education?.year && (
                <p className="form-error text-danger">{errors.education.year}</p>
              )}
            </div>

          </div>
        </div>
      )
      case 3: return (
        <div>
          <h3>Professional Details</h3>
          <div className="d-flex row p-3">
            <TextField id="standard-basic" label="Job or Internship" variant="standard"
              onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, job: e.target.value } })}
              name="experience.job"
              value={values.experience.job}
              onBlur={handleBlur} />
              

            <TextField id="standard-basic" label="Company Name" variant="standard"
              onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, company: e.target.value } })}
              name="experience.company"
              value={values.experience.company}
              onBlur={handleBlur} />
            <TextField id="standard-basic" label="Location " variant="standard"
              onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, location: e.target.value } })}

              name="experience.location"
              value={values.experience.location}
              onBlur={handleBlur} />
            <TextField id="standard-basic" label="Duration " variant="standard"
              onChange={e => setUserInput({ ...userInput, experience: { ...userInput.experience, duration: e.target.value } })}
              name="experience.duration"
              value={values.experience.duration}
              onBlur={handleBlur} />

          </div>
        </div>
      )
      case 4: return (

        <div>
          <h3>Skills</h3>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
              {/* <TextField id="standard-basic" label="Add Skill" variant="standard"
              /> */}
                <div className="error-container">
      {errors.skills && touched.skills && (
        <p className="form-error text-danger">{errors.skills}</p>
      )}
    </div>
              <input ref={userSkillRef} type="text" className='form-control' placeholder='Add skill' />
              <Button onClick={() => addSkill(userSkillRef.current.value)} variant="text" className='me-3' sx={{ maxWidth: "40px" }}>Add</Button>


            </Stack>
             
            <div>
              <h5>Suggestions :</h5>

              <div className="d-flex flex-wrap justify-content-between">
                {
                  suggestionSkills.map(userSkill => (
                    <Button onClick={() => addSkill(userSkill)} variant="outlined">{userSkill}</Button>
                  ))
                }
              </div>
            </div>
            <div>
              <h5>Added Skills:</h5>
              <div className="d-flex justify-content-center ">
                {
                  (userInput.skills.length > 0 ? userInput.skills.map(skill =>
                    <span className='btn btn-primary d-flex align-items-center justify-content-center ms-2'>
                      {skill} <button className='btn text-light'
                        onClick={() => removeSkill(skill)}><RxCross1 /></button>
                    </span>) : <p>Nothing to display</p>
                  )
                }

              </div>
            </div>
          </Box>
          
        </div>
      )
      case 5: return (
        <div>
          <h3>Professional Summary</h3>
          <div className="d-flex row p-3">
            <TextField id="standard-basic" label="Write a short summary of yourself"
              multiline rows={4}
              defaultValue="Eg: I'm a passionate full-stack developer with hands-on expereience in react,node...."
              variant="standard" value={values.summary}
              onChange={e => setUserInput({ ...userInput, summary: e.target.value })}
              name="summary"
              onBlur={handleBlur}
            />
            <div className="error-container">
              {errors.summary && touched.summary && (
                <p className="form-error text-danger">{errors.summary}</p>
              )}
            </div>
          </div>
        </div>

      )
      default: return Null
    }
  }

  // handleaddResume
  const handleAddResume = async () => {
    //object destructuring
    const { name, jobTitle, location } = userInput.personalDetails;

    if (name && jobTitle && location) {
      // alert("api called")

      try {


        const result = await addResumeAPI(userInput)
        console.log(result);
        swal("Success!", "Resume Added", "success");
        setFinish(true);
        setResumeId(result.data.id)

      }
      catch (err) {
        console.log(err);
        swal("Error", "Resume failed", "error");

      }
    }
    else {
      alert("please enter missing field")
    }
  }
  // return statement
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }



              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
              <Box>
                {renderStepContent(activeStep)}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                {activeStep === steps.length - 1 ? <Button onClick={handleAddResume}> Finish </Button> :
                  <Button type='submit' >Next</Button>}

              </Box>
            </React.Fragment>
          )}
        </Box>
      </form>
    </div>
  )
}

export default Steps