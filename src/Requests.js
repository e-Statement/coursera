import { postRequest, getRequest } from './utils';
import settings from './settings.json'

export const getUser = async (id) => {
    return getRequest(`${settings.serverEndpoint}/students/${id}`)
}

export const getUsers = async ({name, specializations, courses, orderBy, isDescending}) => {
    console.log("getting users..");
    var filters = {fullName: name, specializations, courses, orderBy, isDescending}
    return postRequest(`${settings.serverEndpoint}/students`, filters)
        .catch(err => console.log("cant get users from /students " + err))
}

export const getSpecializations = async () => {
    return getRequest(`${settings.serverEndpoint}/specializations`)
        .catch(err => console.log("cant get users from /specializaitons " + err))
}

export const getCourses = async () => {
    return getRequest(`${settings.serverEndpoint}/courses`)
        .catch(err => console.log("cant get users from /courses " + err))
}

export const Authorize = async (email: string, password: string) => {
    return fetch(
        `${settings.serverEndpoint}/Auth/LoginInner`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Email': email,
                "Password": password
            }
        })
        .catch(err => console.log("cant get users from /courses " + err))
}

export const unloadBySpecializationAsync = async (specializationName) => {
    console.log(JSON.stringify(specializationName));
    const respData = await fetch(`${settings.serverEndpoint}/unload/specialization`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(specializationName)
    }).then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((href) => {
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = href
            a.download = `${specializationName}.xlsx`
            a.click()
        })

    return respData;
}

export const unloadByCoursesAsync = async (courses) => {
    console.log(JSON.stringify(courses));
    const respData = await fetch(`${settings.serverEndpoint}/unload/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(courses)
    }).then((response) => response.blob())
        .then((blob) => URL.createObjectURL(blob))
        .then((href) => {
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = href
            a.download = "Courses.xlsx"
            a.click()
        })

    return respData;
}