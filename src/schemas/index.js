
import * as Yup from 'yup';

export const validationSchemas = [
    // case:0
    Yup.object({
      personalDetails: Yup.object({
        name: Yup.string().min(3).required("Please enter your name."),
        jobTitle: Yup.string().required("Please enter your Job Title"),
        location: Yup.string().required("Please enter your location"),
      })
    }),
    // case 1
    Yup.object({
      personalDetails: Yup.object({
        email: Yup.string().email("please enter valid email").required("Email is required"),
        phone: Yup.string().matches(/^[0-9]{10}$/, "Enter a valid 10-digit number").required("please enter number"),
        github: Yup.string().url("enter a valid github link").optional(),
        linkedIn: Yup.string().url("enter a valid LinkedIn link").optional(),
        portfolio: Yup.string().url("enter a valid portfolio link").nullable(),
      })
    }),
    // case 2
    Yup.object({
      education: Yup.object({
        course: Yup.string().required("Course name is required."),
        Collage: Yup.string().required("Collage name is required"),
        university: Yup.string().required("University name is required."),
        year: Yup.string().matches(/^[0-9]{4}$/,"Enter valid year").required("Year of completion is required")
      })
    }),
    // case 3
    Yup.object({
      experience: Yup.object({
        job: Yup.string().nullable(),
        company: Yup.string().nullable(),
        location: Yup.string().nullable(),
        duration: Yup.string().nullable(),

      })
    }),
    // case 4
    Yup.object({
      skills: Yup.array().of(Yup.string().required("skill cannot be empty")).min(1, "atleast one skill is required"),
    }),
    // case 5
    Yup.object({
      summary: Yup.string()
        .max(150, "Summary cannot exceed 150 characters."),
    }),

  ]