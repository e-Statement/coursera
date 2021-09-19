export const postRequest = async (url,data) => {
    console.log("post request with data ", data)
    const respData = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
  .catch(err => console.log("an error occured whilte getting from " + url + ": " + err))

  return respData;
}

export const getRequest = async (url) => {
  console.log("get request to " + url);
  const respData = await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
}).then(response => response.json())
.catch(err => console.log("an error occured whilte getting from " + url + ": " + err))

return respData;
}

