import {useState, useRef, useMemo} from 'react';
import '../styles/mainpage.css';
import Filters from "./Filters"
import { useHistory } from 'react-router-dom'

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

const useSortableData = (items) => {
    const [sortConfig, setSortConfig] = useState({key: "", direction: ""});

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    return { items: sortedItems, requestSort, sortConfig }
}

const StudentsTable = ({students}) => {
    const {items, requestSort, sortConfig} = useSortableData(students);
    const getClassName = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    }
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>
              <button type="button" onClick={() => requestSort('fullName')} className={getClassName('fullName')}>
                  Имя студента
              </button>
          </th>
          <th>
              <button type="button" onClick={() => requestSort('averageHours')} className={getClassName('averageHours')}>
                  Среднее кол-во часов обучения
              </button>
          </th>
          <th>
              <button type="button" onClick={() => requestSort('averageGrade')} className={getClassName('averageGrade')}>
                  Средняя оценка за курс
              </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map(student => <Student student={student} key={Math.random() * 1000}/>)}
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
    </header>
    <main className="students">
      {students.length !== 0 && <StudentsTable students={students}/>}
      <img ref={icon} src="refresh.png" className="loading-icon" hidden={true} alt="Loading..." />
    </main>
    </div>
  )
}




export default Main;