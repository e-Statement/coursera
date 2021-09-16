import { postRequest, getRequest } from './utils';

export const getUser = async (fullName) => {
    return postRequest("http://localhost:4200/student", {name: fullName})
  }
  
  export  const getUsers = async ({name, specializations, courses, orderBy, isDescending}) => {
    console.log("getting users..");
    return postRequest("http://localhost:4200/students", {name, specializations, courses, orderBy, isDescending})
    .catch(err => console.log("cant get users from /students " + err))         
  }
  
  export const getSpecializations = async () => {
    return getRequest("http://localhost:4200/specializations")
    .catch(err => console.log("cant get users from /specializaitons " + err))   
  }
  
  export const getCourses = async () => {
    return getRequest("http://localhost:4200/courses")
    .catch(err => console.log("cant get users from /courses " + err))   
  }

  export const unloadBySpecializationAsync = async (specializationName) => {
      console.log(JSON.stringify(specializationName));
    const respData = await fetch("http://localhost:4200/unloadBySpecialization", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(specializationName)
      }).then(response => response.blob())
    
      return respData;
  }