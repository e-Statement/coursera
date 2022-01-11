import { Button, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Select from 'react-select'
import { getUsers, getSpecializations, getCourses, unload} from '../Requests'
import "../styles/filters.css"


const Filters = ({setStudents, icon}) => {
  const [filters,setFilters] = useState({name: "", specializations:[], courses: [], orderBy:"name", isDescending: false})
  const [courses, setCourses] = useState([])
  const [specializations, setSpecializations] = useState([])

  useEffect(() => {
    const asyncFunc = async () => {
      const getSpecializationsResult = await getSpecializations()
      const getCoursesResult = await getCourses()
    
      if (getCoursesResult)
        setCourses(getCoursesResult.courses || [])

      if (getSpecializationsResult)
         setSpecializations(getSpecializationsResult.specializations || [])
    }
    asyncFunc()
  },[])

    const clickHandler = async () => {
      icon.current.hidden = false;
      setStudents([])
        const getUsersResult = await getUsers(filters)
        if (getUsersResult) {
          setStudents(getUsersResult.students || [])
        }
          
        icon.current.hidden = true;
    }

    const specializationsOptions = specializations.map(spec => {return {value: spec, label: spec}})
    const coursesOptions = courses.map(course => {return {value: course, label: course}})
  
    return (<div className="filters">
    <div>
      <Input setFilters={setFilters} filters={filters}/>
      <Select className="specs select" options={specializationsOptions} isMulti placeholder="Специализации" onChange={(e) => {
        setFilters({...filters,specializations:e.map(spec => spec.value)})
      }}/>
      <Select className="courses select" options={coursesOptions} isMulti placeholder="Курсы" onChange={(e) => {
        setFilters({...filters,courses:e.map(course => course.value)})
      }}/>
    </div>
    <div className="filter-buttons">
      <Button variant="contained" color="primary" onClick={async () => await clickHandler()}>Найти</Button>
    </div>
    <div className="unload-buttons">
      <Button variant="contained" color="primary" onClick={() => unload({courses:filters.courses, specializations:filters.specialization})}>Выгрузить</Button>
    </div>
    
  </div>)
  }

  const Input = ({filters,setFilters}) => {
    return <TextField 
    className="input"
     label="Имя студента" 
      variant="outlined"
      onChange={async (e) => {
            setFilters({...filters,name: e.target.value})
          }} />
  }

  export default Filters;