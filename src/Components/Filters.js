import { AppContext } from '../App'
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { useContext } from 'react';
import Select from 'react-select'
import { getUsers } from '../Requests'


const Filters = ({setFilters, filters}) => {
    const app = useContext(AppContext)
    const icon = app.icon
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

    const specializationsOptions = app.specializations.map(spec => {return {value: spec, label: spec}})
    const coursesOptions = app.courses.map(course => {return {value: course, label: course}})
  
    return (<div className="filters" >
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

  export default Filters;