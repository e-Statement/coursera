import { useEffect, useContext, useRef, useState } from 'react';
import { AppContext } from './App'
import { findUser } from './utils';

const getUser = async (fullName) => {
  const fetchedUser = await fetch("http://localhost:4200/student", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: fullName
    })
  }).then(response => response.json())

  return fetchedUser;
}

const Users = () => {
  const app = useContext(AppContext)
  const [isFocused, setIsFocused] = useState(false)
  const searchInput = useRef(null)

  useEffect(async () => {
    const getUsers = async () => {
      let res = await fetch("http://localhost:4200/students")
        .then(response => response.json())
        .catch(err => console.log(err))
      return res;
    }
    let students = await getUsers();
    app.setUsers(students)
  }, [])

  document.onclick = () => {
    setIsFocused(document.activeElement === searchInput.current)
  }

  return (
    <div className="users">
      <input ref={searchInput} id="find" type="text" onChange={(e) => app.setFoundUsers(findUser(e.target.value, app.users))} />
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