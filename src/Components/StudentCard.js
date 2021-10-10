//eslint-disable-next-line
import datejs from 'datejs'
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Specializations from './Specializations'
import Course from './Course'
import { useParams  } from "react-router-dom";
import { getUser } from '../Requests'
import { Link } from 'react-router-dom'
import "../styles/studentcard.css"



const StudentCard = () => {
    let { id } = useParams();
    console.log(id);
    const [student, setStudent] = useState(null)

    useEffect(() => {
        const getAsync = async () => {
            const getStudentResult = await getUser(id);
            setStudent(getStudentResult)
        }
        getAsync()
    },[id])
    console.log(student);
    return (
        <div className="student-card">
        {student != null 
        ? 
        <>
        <Link to="/index.html">
            <ArrowBackIcon style={{ fontSize: 40, cursor:"pointer" }} className="back" onClick={() => {}}/>
        </Link>
            <h1>Студент: {student.fullName} {student.group}</h1>
            <br></br>
            {(student.specializations.length !== 0
            ? <Specializations specializations={student.specializations} />
            : <h2>У данного ученика нет специализаций</h2>)}
            <br />
            <div className="courses-wthout-specialization">
                {student.coursesWithoutSpecialization.length !== 0 && <h2>Курсы без специализации</h2>}
                {student.coursesWithoutSpecialization.map(course => <Course key={Math.random() * 1000} course={course}/>)}
            </div>
        </>
        : <h1>Not Found</h1>
        }
        </div>
    )
}

export default StudentCard;