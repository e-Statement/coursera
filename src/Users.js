import { useContext, useRef, useState } from 'react';
import { AppContext } from './App'
import { postRequest } from './utils';

const getUser = async (fullName) => {
  return postRequest("http://localhost:4200/student", {name: fullName})
}

const getUsers = async (input) => {
  return postRequest("http://localhost:4200/students", {name: input})
                            .catch(err => console.log("cant get users from /students " + err))         
}



const Users = () => {
  const app = useContext(AppContext)
  const [isFocused, setIsFocused] = useState(false)
  const searchInput = useRef(null)
  const icon = app.icon
  const errorMessage = app.errorMessage


  document.onclick = () => {
    setIsFocused(document.activeElement === searchInput.current)
  }

  return (
    <div className="users">
      <input ref={searchInput} id="find" type="text" onChange={async (e) => app.setFoundUsers(await getUsers(e.target.value))} />
      <div className="search-list" style={isFocused ? { display: "block" } : { display: "none" }}>
        { app.foundUsers !== undefined && 
          app.foundUsers.map(user =>
            <button className="users-item" key={Math.random() * 1000} onClick={async e => {
              app.setCurrentUser(null)
              icon.current.hidden = false;
              errorMessage.current.hidden = true
              await getUser(user.fullName)
              .then(users => {
                icon.current.hidden = true;
                app.setCurrentUser(users)
              }).catch(err => {
                icon.current.hidden = true;
                errorMessage.current.hidden = false
                console.log("cant get user from /student " + err)
              })
              
            }
            }>{user.fullName}</button>
          )
        }
      </div>
    </div>
  )
}




export default Users;