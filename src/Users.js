import { useEffect,useContext,useRef, useState } from 'react';
import {fetchAndParseCsv,findUser,validateUserName} from './utils'
import {AppContext} from './App'

const Users = () => {
    const app = useContext(AppContext)  
    const [isFocused,setIsFocused] = useState(false)
    const searchInput = useRef(null)
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

    document.onclick = () => {
        setIsFocused(document.activeElement === searchInput.current)
    }

    return (
        <div className="users">
        <input ref={searchInput} id="find" type="text" onChange={(e) => app.setFoundUsers(findUser(e.target.value,app.users))}/>
        <div className="search-list" style={isFocused ? {display:"block"} : {display:"none"}}>
            {app.foundUsers.map(user => 
            <button onClick={(e) => app.setCurrentUser(app.users[e.currentTarget.textContent])} className="users-item" key={Math.random() * 1000}>{user}</button>
            )}
        </div>
        
      </div>
    )
}

const user = (csvRow) => {
    return {
        specializations:[],
        courses:[],
        name:csvRow[0],
        email:csvRow[1],
        group:csvRow[2]
    }
}

const course = (csvRow) => {
    return {
        name:csvRow[3],
        progress:Math.floor(csvRow[11]),
        completed:csvRow[13],
        grade:Math.floor(csvRow[19]),
        sertificateUrl:csvRow[20],
        learningHours:Math.round((csvRow[12] + Number.EPSILON) * 100) / 100
    }
}


const addSpecialization = (arrays) => {
    const uploadedUsers = {}
    for (let i = 1; i < arrays.length;i++) {

      if (validateUserName(arrays[i][0])) {

        if (uploadedUsers[arrays[i][0]] === undefined) {
            uploadedUsers[arrays[i][0]] = user(arrays[i])
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
          uploadedUsers[arrays[i][0]] = user(arrays[i])
        }
          uploadedUsers[arrays[i][0]].courses.push(course(arrays[i]))
        }
      }
      return uploadedUsers;
}


export default Users;