import { useState, useRef } from 'react';
import '../styles/mainpage.css';
import Filters from "./Filters"
import Unload from "./Unload"
import { useHistory } from 'react-router-dom'
import {AuthorizationManager} from "./Authorize";

const Student = ({student}) => {

  const history = useHistory();
  const handleRowClick = (id) => {
    history.push(`/students/${id}`);
  }  

  return (
    <tr className="student" onClick={()=> handleRowClick(student.id)}>
      <td>{student.fullName}</td>
      <td>{student.averageHours ? student.averageHours.toFixed(2) : 0}</td>
      <td>{student.averageGrade ? student.averageGrade.toFixed(2) : 0}</td>
    </tr>)
}

const StudentsTable = ({students}) => {
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>Имя студента</th>
          <th>Среднее кол-во часов обучения</th>
          <th>Средняя оценка за курс</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => <Student student={student} key={Math.random() * 1000}/>)}
      </tbody>
    </table>
  )
}


const Main = () => {
  const [students, setStudents] = useState([])
  const icon = useRef(null)

  return (
    <div className="main-page">
    <header className="header">
      <Filters setStudents={setStudents} icon={icon}/>
      <Unload />
    </header>
    <AuthorizationManager />
    <main className="students">
      {students.length !== 0 && <StudentsTable students={students}/>}
      <img ref={icon} src="refresh.png" className="loading-icon" hidden={true} alt="Loading..." />
    </main>
  </div>
  )
}




export default Main;