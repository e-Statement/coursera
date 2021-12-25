import { Button, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import React from 'react';
import Select from 'react-select'
import {getUsers, getSpecializations, getCourses, unloadByCoursesAsync, unloadBySpecializationAsync} from '../Requests'
import "../styles/filters.css"
import {FilterContext} from "../utils/store";
import { Link } from 'react-router-dom'
import {useHistory} from "react-router-dom";

const Upload = () => {
  const history = useHistory();
  const toUpload = () => {
    history.push('/uploadnew');
  }

  return(
      <Button variant="contained" color="primary" onClick={() => toUpload()}>Загрузить новые файлы</Button>
  )
}


const Filters = ({setStudents, icon}) => {
  const [filters, setFilters] = React.useContext(FilterContext).filters
  const [ctxStudents, ctxSetStudents] = React.useContext(FilterContext).students
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
      if (!setStudents)
        setStudents = ctxSetStudents

      if (icon.current)
        icon.current.hidden = false

      setStudents([])
        const getUsersResult = await getUsers(filters)
        if (getUsersResult) {
          setStudents(getUsersResult.students || [])
        }

      if (icon.current)
        icon.current.hidden = true
    }

    const specializationsOptions = specializations.map(spec => {return {value: spec, label: spec}})
    const coursesOptions = courses.map(course => {return {value: course, label: course}})
    const filterSpecsOptions = filters.specializations.map(spec => {return {value: spec, label: spec}})
    const filterCoursesOptions = filters.courses.map(course => {return {value: course, label: course}})

    return (<div className="filters">
    <div>
      <Input setFilters={setFilters} filters={filters}/>
      <Select className="specs select" options={specializationsOptions} isMulti placeholder="Специализации" defaultValue = {filterSpecsOptions} onChange={(e) => {
        setFilters({...filters,specializations:e.map(spec => spec.value)})
      }}/>
      <Select className="courses select" options={coursesOptions} isMulti placeholder="Курсы" defaultValue = {filterCoursesOptions} onChange={(e) => {
        setFilters({...filters,courses:e.map(course => course.value)})
      }}/>
    </div>
    <div>
      {window.location.pathname !== "/index.html" && <Link to="/index.html">
        <div className="filter-buttons">
          <Button variant="contained" color="primary" onClick={async () => await clickHandler()}>Найти</Button>
          <Upload/>
        </div>
      </Link>
      }
      {window.location.pathname === "/index.html" &&
          <div className="filter-buttons">
            <Button variant="contained" color="primary" onClick={async () => await clickHandler()}>Найти</Button>
            <Upload/>
          </div>
      }
    </div>
    <div className="unload-buttons">
      <Button variant="contained" color="primary" onClick={() => unloadBySpecializationAsync(filters.specializations)}>Выгрузить по специализации</Button>
      <Button variant="contained" color="primary" onClick={() => unloadByCoursesAsync(filters.courses)}>Выгрузить по курсам</Button>
    </div>
    
  </div>)
  }

const Input = ({filters, setFilters}) => {
  return <TextField
      className="input"
      label="Имя студента"
      variant="outlined"
      value={filters.name}
      onChange={async (e) => {
        setFilters({...filters, name: e.target.value})
      }}/>
}

  export default Filters;