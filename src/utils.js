import Papa from 'papaparse'

export const fetchAndParseCsv = async (fileName) => {
    return fetch(fileName)
    .then(resp => resp.text())
    .then(text => {
      let result = Papa.parse(text).data
      return result;
    })
}

export const findUser = (userName , users) => {
    if (userName === "") return []
    return Object.keys(users).filter(x => x.toLowerCase().includes(userName.toLowerCase()))
}

export const validateUserName = (name) => {
    return name !== "ANONYMIZED_NAME" && name !== "" && name !== undefined && name !== null
}