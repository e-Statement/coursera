import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Select from 'react-select'
import { getUsers, getSpecializations, getCourses} from '../Requests'
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
    
    const orderBy = [
      {value:  "hours", label: "Часы обучения"},
      {value: "grade", label: "Оценка за курс"},
      {value: "name", label: "Имя"}
    ]

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
      <Select className="courses select" options={orderBy} placeholder="Сортировка" onChange={(e) => {
        setFilters({...filters,orderBy: e.value})
      }}/>
    </div>
    <div className="filter-buttons">
      <FormControlLabel style={{display: "block"}}
            control={
              <Checkbox
                color="primary"
                onChange={e => {
                  setFilters({...filters,isDescending:e.target.checked})
                }}
              />
            }
            label="По убыванию"
          />
      <Button variant="contained" color="primary" onClick={async () => await clickHandler()}>Найти</Button>
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