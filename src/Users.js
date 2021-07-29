import { useEffect,useContext } from 'react';
import {fetchAndParseCsv,findUser,validateUserName} from './utils'
import {AppContext} from './App'

const Users = () => {
    const app = useContext(AppContext)  
    useEffect(() => {
        fetchAndParseCsv('specialization.csv')
        .then(arrays => {
          return addSpecialization(arrays)
        })
        .then(users => {
          fetchAndParseCsv('usage.csv')
          .then(arrays => {
            let res = addCourses(users,arrays)
            app.setUsers(res)
          })
        })
    },[])

    return (
        <div className="users">
        <input id="find" type="text" onChange={(e) => app.setFoundUsers(findUser(e.target.value,app.users))}/>
        {app.foundUsers.map(user => 
        <button onClick={(e) => {
            app.setCurrentUser(app.users[e.currentTarget.textContent])
        }} className="users-item" key={Math.random() * 1000}>{user}</button>
        )}
      </div>
    )
}


const addSpecialization = (arrays) => {
    const uploadedUsers = {}
    for (let i = 1; i < arrays.length;i++) {
      if (validateUserName(arrays[i][0])) {
        if (uploadedUsers[arrays[i][0]] === undefined) {
          uploadedUsers[arrays[i][0]] = {
            specializations:[],
            courses:[]
          };
        }
        
        uploadedUsers[arrays[i][0]].specializations.push(arrays[i][3])
      }
    } 
    return uploadedUsers;
}

const addCourses = (uploadedUsers,arrays) => {
    for (let i = 1; i < arrays.length;i++) {
      
      if (validateUserName(arrays[i][0])) {
        if (uploadedUsers[arrays[i][0]] === undefined) {
          uploadedUsers[arrays[i][0]] = {
            specializations:[],
            courses:[]
          }
        }
          uploadedUsers[arrays[i][0]].courses.push(
            {name:arrays[i][3],
              progress:Math.floor(arrays[i][11]),
              completed:arrays[i][13],
              grade:Math.floor(arrays[i][19])
            })
        }
      }
      return uploadedUsers;
}


export default Users;