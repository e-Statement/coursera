import { useState , useRef, useEffect } from 'react';
import StudentCard from './Components/StudentCard';
import Main from './Components/Main'
import React from 'react';
import {getSpecializations, getCourses} from './Requests'

export const AppContext = React.createContext(null)

function App() {
  const [users,setUsers] = useState([])
  const [foundUsers,setFoundUsers] = useState([])
  const [currentUser,setCurrentUser] = useState()
  const icon = useRef(null)
  const errorMessage = useRef(null)
  const [isMainPage, setIsMainPage] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [courses, setCourses] = useState([])
  const [specializations, setSpecializations] = useState([])

  useEffect(() => {
    const asyncFunc = async () => {
      const getSpecializationsResult = await getSpecializations()
      const getCoursesResult = await getCourses()

      console.log(getCoursesResult);
      console.log(getSpecializationsResult);

    
      if (getCoursesResult)
        setCourses(getCoursesResult.courses || [])

      if (getSpecializationsResult)
         setSpecializations(getSpecializationsResult.specializations || [])
    }
    asyncFunc()
  },[])

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
    setScrollY,
    courses,
    specializations
  }

  return (
    <AppContext.Provider value={contextObj}>
        <Main />
        <img ref={icon} src="refresh.png" className="loading-icon" hidden={true}/>
        {currentUser && <StudentCard student={currentUser}/>}
    </AppContext.Provider>
  );
}

export default App;
