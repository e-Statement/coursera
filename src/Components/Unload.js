import { Button } from '@material-ui/core';
import Select from 'react-select'
import {useState, useEffect} from 'react'
import {unloadBySpecializationAsync, unloadByCoursesAsync, getSpecializations, getCourses}  from '../Requests'
import "../styles/unloadmenu.css"

const unloadBySpecialization = async (specialization) => {
    await unloadBySpecializationAsync(specialization)
}

const Unload = () => {
    const [specializationToUnload, setSpecializationToUnload] = useState(null)
    const [coursesToUnload, setCoursesToUnload] = useState(null)

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

    const specializationsOptions = specializations.map(spec => {return {value: spec, label: spec}})
    const coursesOptions = courses.map(course => {return {value: course, label: course}})

    return (
    <div className="unload-menu">
    <Select options={specializationsOptions} placeholder="Специализации" onChange={(e) => setSpecializationToUnload(e.value)}/>
    <Select className="courses-to-unload select" options={coursesOptions} isMulti placeholder="Курсы" onChange={(e) => 
            setCoursesToUnload(e.map(course => course.value))
          }/>
        <div className="unload-buttons">
            <Button variant="contained" color="primary" onClick={() => unloadBySpecialization(specializationToUnload)}>Выгрузить по специализации</Button>
            <Button variant="contained" color="primary" onClick={() => unloadByCoursesAsync(coursesToUnload)}>Выгрузить по курсам</Button>
        </div>
    </div>
    )
}

export default Unload;