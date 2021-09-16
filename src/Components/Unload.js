import { Button } from '@material-ui/core';
import Select from 'react-select'
import { AppContext } from '../App'
import {useState, useContext} from 'react'
import {unloadBySpecializationAsync}  from '../Requests'

const unloadBySpecialization = async (specialization) => {
    await unloadBySpecializationAsync(specialization)
}

const Unload = () => {
    const app = useContext(AppContext)
    const [specialization, setSpecialization] = useState(null)
    const [courses, setCourses] = useState(null)

    const specializationsOptions = app.specializations.map(spec => {return {value: spec, label: spec}})
    const coursesOptions = app.courses.map(course => {return {value: course, label: course}})

    return (
    <div className="unload">
    <Select options={specializationsOptions} placeholder="Специализации" onChange={(e) => setSpecialization(e.value)}/>
    <Select className="courses select" options={coursesOptions} isMulti placeholder="Курсы" onChange={(e) => 
            setCourses(e.map(course => course.value))
          }/>
        <div className="unload-buttons">
            <Button variant="contained" color="primary" onClick={() => unloadBySpecialization(specialization)}>Выгрузить по специализации</Button>
            <Button variant="contained" color="primary">Выгрузить по курсам</Button>
        </div>
    </div>
    )
}

export default Unload;