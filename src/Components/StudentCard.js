//eslint-disable-next-line
import datejs from 'datejs'
import React, {useState, useEffect, useRef} from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Specializations from './Specializations'
import Course from './Course'
import { useParams  } from "react-router-dom";
import { getUser } from '../Requests'
import { Link } from 'react-router-dom'
import "../styles/studentcard.css"
import Filters from "./Filters";



const StudentCard = () => {
    let { id } = useParams();
    console.log(id);
    const [student, setStudent] = useState(null)
    const icon = useRef(null)
    useEffect(() => {
        const getAsync = async () => {
            const getStudentResult = await getUser(id);
            setStudent(getStudentResult)
        }
        getAsync()
    },[id])
    console.log(student);
    return (
        <div>
            <Filters icon={icon} />
        <div className="student-card">
        {student != null
        ? 
        <>
        <Link to="/index.html">
            <ArrowBackIcon style={{ fontSize: 40, cursor:"pointer" }} className="back" onClick={() => {}}/>
        </Link>
            <h2>Студент: {student.fullName} {student.group}</h2>
            <br/>
            {(student.specializations.length !== 0
            ? <Specializations specializations={student.specializations} />
            : <h3>У данного ученика нет специализаций</h3>)}
            <br />
            <div className="courses-wthout-specialization">
                {student.coursesWithoutSpecialization.length !== 0 && <h3>Курсы без специализации</h3>}
                {student.coursesWithoutSpecialization.map(course => <Course key={Math.random() * 1000} course={course}/>)}
            </div>
        </>
        : <h2>Not Found</h2>
        }
        </div>
        </div>
    )
}

export default StudentCard;