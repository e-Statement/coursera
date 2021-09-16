export const postRequest = async (url,data) => {
    const respData = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())

  return respData;
}

export const getRequest = async (url) => {
  const respData = await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
}).then(response => response.json())

return respData;
}

