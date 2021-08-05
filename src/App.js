import './index.css';
import { useState } from 'react';
import StudentInfo from './StudentInfo';
import Users from './Users'
import React from 'react';

export const AppContext = React.createContext(null)

function App() {
  const [users,setUsers] = useState([])
  const [foundUsers,setFoundUsers] = useState([])
  const [currentUser,setCurrentUser] = useState()

  const contextObj = {
    users,
    setUsers,
    foundUsers,
    setFoundUsers,
    currentUser,
    setCurrentUser
  }

  return (
    <AppContext.Provider value={contextObj}>
      <div className="App">
        <Users />
        {currentUser && <StudentInfo student={currentUser}/>}
      </div>
    </AppContext.Provider>
  );
}

export default App;
