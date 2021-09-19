import { useContext, useState } from 'react';
import { AppContext } from '../App'
import '../styles/mainpage.css';
import Filters from "./Filters"
import {getUser} from '../Requests'
import Unload from "./Unload"

const Student = ({student}) => {
  const app = useContext(AppContext)
  return <tr className="student" onClick={async () => {
    const response = await getUser(student.id)
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

const StudentsTable = ({students}) => {
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
        {students.map(student => <Student student={student} key={Math.random() * 1000}/>)}
      </tbody>
    </table>
  )
}


const Main = () => {
  const app = useContext(AppContext)
  const [filters,setFilters] = useState({name: "", specializations:[], courses: [], orderBy:"name", isDescending: false})
  return (
    <div className={`main ${!app.isMainPage ? "hide-main-page" : null}`}>

    <header className="header">
      <Filters setFilters={setFilters} filters={filters}/>
      <Unload />
    </header>

    <main>
      {app.foundUsers.length !== 0 && <StudentsTable students={app.foundUsers}/>}
    </main>

  </div>
  )
}




export default Main;