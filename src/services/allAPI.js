import baseUrl from "./baseurl"
import commonAPI from "./commonAPI"

//resume-inorder to take value when finish button is clicked
export const addResumeAPI=async(resume)=>{

    return await commonAPI("POST",`${baseUrl}/resumes`,resume)
}

// editResumeAPI
export const editResumeAPI=async(id,resume)=>{
    return  await commonAPI("PUT",`${baseUrl}/resumes/${id}`,resume)
}

// addDownloadHistory
export const addDownloadHistoryAPI=async(resume)=>{
    return await commonAPI("POST",`${baseUrl}/history`,resume)
}
// getDownloadHistory
export const getHistoryAPI=async()=>{
    return await commonAPI("GET",`${baseUrl}/history`,{})
}
// deleteDownloadHistory
export const deleteDownloadHistory=async(id)=>{
    return await commonAPI("DELETE",`${baseUrl}/history/${id}`,{})
}

//getResumeApI

export const getResumeAPI=async(id)=>{
    return await commonAPI("GET",`${baseUrl}/resumes/${id}`,{})
}