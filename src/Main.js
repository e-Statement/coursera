import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './App'
import { postRequest, getRequest } from './utils';
import './mainpage.css';
import Select from 'react-select'
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';

const getUser = async (fullName) => {
  return postRequest("http://localhost:4200/student", {name: fullName})
}

const getUsers = async ({name, specializations, courses, orderBy, isDescending}) => {
  console.log("getting users..");
  return postRequest("http://localhost:4200/students", {name, specializations, courses, orderBy, isDescending})
                            .catch(err => console.log("cant get users from /students " + err))         
}

const getSpecializations = async () => {
  return getRequest("http://localhost:4200/specializations")
                            .catch(err => console.log("cant get users from /specializaitons " + err))   
}

const getCourses = async () => {
  return getRequest("http://localhost:4200/courses")
                            .catch(err => console.log("cant get users from /courses " + err))   
}

const Input = ({filters,setFilters}) => {
  return (<div className="find-student">
    <input 
        id="find" 
        type="text" 
        placeholder="Имя студента" 
        onChange={async (e) => {
          setFilters({...filters,name: e.target.value})
        }}
        />
  </div>)
}

const Filters = ({setFilters, filters}) => {
  const [specs,setSpecs] = useState([])
  const [courses, setCourses] = useState([])
  const app = useContext(AppContext)
  const icon = app.icon

  useEffect(() => {
    const asyncFunc = async () => {
      const data = await getSpecializations()
      const courses = await getCourses()
      setSpecs(data || [])
      setCourses(courses || [])
    }
    asyncFunc()
  },[])

  const clickHandler = async () => {
    icon.current.hidden = false;
    app.setFoundUsers([])
      const data = await getUsers(filters)
      app.setFoundUsers(data || [])
      icon.current.hidden = true;
  }
  
  const orderBy = [
    {value:  "hours", label: "Часы обучения"},
    {value: "grade", label: "Оценка за курс"},
    {value: "name", label: "Имя"}
  ]

  return (<div className="filters" >
  <div>
    <Input setFilters={setFilters} filters={filters}/>
    <Select className="specs select" options={specs.map(spec => {return {value: spec, label: spec}})} isMulti placeholder="Специализации" onChange={(e) => {
      setFilters({...filters,specializations:e.map(spec => spec.value)})
    }}/>
    <Select className="courses select" options={courses.map(course => {return {value: course, label: course}})} isMulti placeholder="Курсы" onChange={(e) => {
      setFilters({...filters,courses:e.map(course => course.value)})
    }}/>
    <Select value={orderBy[2]} className="courses select" options={orderBy} placeholder="Сортировка" onChange={(e) => {
      setFilters({...filters,orderBy: e.value})
    }}/>
  </div>
  <div className="filter-buttons">
    <FormControlLabel style={{display: "block"}}
          control={
            <Checkbox
              color="primary"
              onChange={e => {
                console.log(e.target.checked);
                setFilters({...filters,isDescending:e.target.checked})
              }}
            />
          }
          label="По убыванию"
        />
    <Button variant="contained" color="primary" onClick={async () => await clickHandler()}>Найти</Button>
    <Button variant="contained" color="primary" id="unload">Выгрузка</Button>
  </div>
  
</div>)
}

const Student = ({student}) => {
  const app = useContext(AppContext)
  return <tr className="student" onClick={async () => {
    const response = await getUser(student.fullName)
    app.setCurrentUser(response)
    app.setIsMainPage(false)
    app.setScrollY(window.scrollY)
    setTimeout(() => {
      window.scrollTo(0,0);
      document.body.style.overflowY = 'unset';
    },50)
  }}>
    <td>{student.fullName}</td>
    <td>{student.averageHours ? student.averageHours.toFixed(2) : 0}</td>
    <td>{student.averageGrade ? student.averageGrade.toFixed(2) : 0}</td>
  </tr>
}

const Students = ({filters}) => {
  const app = useContext(AppContext)
  useEffect(() => {
    const asyncFunc = async () => {
      const data = await getUsers(filters).catch(err => console.log(err))
      app.setFoundUsers(data || [])
    }
    asyncFunc()
  },[])
  return (
    <table className="students">
      <thead>
        <tr>
          <th>Имя студента</th>
          <th>Среднее кол-во часов обучения</th>
          <th>Средняя оценка за курс</th>
        </tr>
      </thead>
      <tbody>
        {app.foundUsers
        .map(student => <Student student={student} key={Math.random() * 1000}/>)}
      </tbody>
      
    </table>
  )
}

//    {app.foundUsers.sort((a,b) => - a.averageGrade + b.averageGrade).map(student => <Student student={student} key={Math.random() * 1000}/>)}




const Main = () => {
  const app = useContext(AppContext)
  const [filters,setFilters] = useState({name: "", specializations:[], courses: [], orderBy:"name", isDescending: false})
  return (
    <div className={`main ${!app.isMainPage ? "hide-main-page" : null}`}>
      <Filters setFilters={setFilters} filters={filters}/>
      {app.foundUsers.length !== 0 && <Students filters={filters}/>}
    </div>
  )
}




export default Main;