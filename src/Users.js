import { useContext, useRef, useState } from 'react';
import { AppContext } from './App'
import { postRequest } from './utils';

const getUser = async (fullName) => {
  const fetchedUser = await postRequest("http://localhost:4200/student", {name: fullName})
                            .catch(err => console.log("cant get user from /student " + err))

  return fetchedUser;
}

const getUsers = async (input) => {
  const users = await postRequest("http://localhost:4200/students", {name: input})
                            .catch(err => console.log("cant get users from /students " + err))         
  return users;
}

const Users = () => {
  const app = useContext(AppContext)
  const [isFocused, setIsFocused] = useState(false)
  const searchInput = useRef(null)

  document.onclick = () => {
    setIsFocused(document.activeElement === searchInput.current)
  }

  return (
    <div className="users">
      <input ref={searchInput} id="find" type="text" onChange={async (e) => app.setFoundUsers(await getUsers(e.target.value))} />
      <div className="search-list" style={isFocused ? { display: "block" } : { display: "none" }}>
        {
          app.foundUsers.map(user =>
            <button className="users-item" key={Math.random() * 1000} onClick={async e => {
              let fetchedUser = await getUser(user.fullName)
              app.setCurrentUser(fetchedUser)
            }
            }>{user.fullName}</button>
          )
        }
      </div>
    </div>
  )
}




export default Users;