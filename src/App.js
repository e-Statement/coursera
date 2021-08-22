import './index.css';
import { useState , useRef } from 'react';
import StudentInfo from './StudentInfo';
import Users from './Users'
import React from 'react';

export const AppContext = React.createContext(null)

function App() {
  const [users,setUsers] = useState([])
  const [foundUsers,setFoundUsers] = useState([])
  const [currentUser,setCurrentUser] = useState()
  const icon = useRef(null)
  const errorMessage = useRef(null)

  const contextObj = {
    users,
    setUsers,
    foundUsers,
    setFoundUsers,
    currentUser,
    setCurrentUser,
    icon,
    errorMessage
  }

  return (
    <AppContext.Provider value={contextObj}>
      <div className="App">
        <Users />
        {currentUser && <StudentInfo student={currentUser}/>}
        <img ref={icon} src="refresh.png" alt="icon" className="loading-icon" hidden/>
        <h3 ref={errorMessage} className="error-messsage" hidden>Не удалось получить информацию о студенте :(</h3>
      </div>
    </AppContext.Provider>
  );
}

export default App;
