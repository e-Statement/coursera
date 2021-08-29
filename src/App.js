import './index.css';
import { useState , useRef } from 'react';
import StudentInfo from './StudentInfo';
import Main from './Main'
import React from 'react';

export const AppContext = React.createContext(null)

function App() {
  const [users,setUsers] = useState([])
  const [foundUsers,setFoundUsers] = useState([])
  const [currentUser,setCurrentUser] = useState()
  const icon = useRef(null)
  const errorMessage = useRef(null)
  const [isMainPage, setIsMainPage] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  const contextObj = {
    users,
    setUsers,
    foundUsers,
    setFoundUsers,
    currentUser,
    setCurrentUser,
    icon,
    errorMessage,
    isMainPage,
    setIsMainPage,
    scrollY,
    setScrollY
  }

  return (
    <AppContext.Provider value={contextObj}>
        <Main />
        <img ref={icon} src="refresh.png" className="loading-icon" hidden={true}/>
        {currentUser && <StudentInfo student={currentUser}/>}
    </AppContext.Provider>
  );
}

export default App;
