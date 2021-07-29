import './index.css';
import Papa from 'papaparse'
import { useEffect, useState } from 'react';
import UserInfo from './UserInfo';

const results = []

const reader = new FileReader()

const upload = () => {
  const file = document.querySelector('#urfu').files[0]
  reader.onloadend = (e) => {
    var content = e.target.result;
    console.log(content);
  }
  reader.readAsText(file)
}

const fetchAndParseCsv = async (fileName) => {
  return fetch(fileName)
  .then(resp => resp.text())
  .then(text => {
    let result = Papa.parse(text).data
    return result;
  })
}

const findUser = (userName , users) => {
  if (userName == "") return []
  return Object.keys(users).filter(x => x.toLowerCase().includes(userName.toLowerCase()))
}

function App() {
  const [users,setUsers] = useState({})
  const [foundUsers,setFoundUsers] = useState([])
  const [currentUser,setCurrentUser] = useState()

  const updateUsers = (arrays) => {
    const uploadedUsers = {}
    for (let i = 1; i < arrays.length;i++) {
      if (uploadedUsers[arrays[i][3]] == null) {
        let user = {
          specialization:"",
          courses:[]
        }
        uploadedUsers[arrays[i][3]] = user;
      }
    } 
    setUsers(uploadedUsers)
    console.log(uploadedUsers);
  }

  useEffect(() => {
    fetchAndParseCsv('urfu.csv')
    .then(arrays => {
      updateUsers(arrays)
    })
  },[])

  return (
    <div className="App">
      <input id="find" type="text" onChange={(e) => setFoundUsers(findUser(e.target.value,users))}/>
      {foundUsers.map(user => <a className="users-item" key={Math.random() * 1000}>{user}</a>)}
    </div>
  );
}

export default App;

//{users.map(user => <h3 key={Math.random() * 1000}>{user}</h3>)}
//<input type='file' id='urfu'/>
//<button onClick={() => upload()}>Upload</button>
