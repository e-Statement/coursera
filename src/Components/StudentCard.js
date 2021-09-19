import Collapse from "./Accordion";
//eslint-disable-next-line
import datejs from 'datejs'
import { useContext} from 'react';
import { AppContext } from '../App'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Specializations from './Specializations'
import Course from './Course'


const StudentCard = ({student}) => {
    console.log(student);
    const app = useContext(AppContext)
    return (
        <div className={`stats ${!app.isMainPage ? "show" : "hide-student-info"}`}>
            <ArrowBackIcon style={{ fontSize: 40, cursor:"pointer" }} className="back" onClick={() => {
                app.setIsMainPage(true)
                document.body.style.overflowY = 'unset';
                setTimeout(() => {
                    window.scrollTo(0,app.scrollY);
                }, 500) 
            }}/>
            <h1>Студент: {student.fullName} {student.group}</h1>
            <br></br>
            {student.specializations.length != 0 
            && <Specializations specializations={student.specializations} />
            || <h2>У данного ученика нет специализаций</h2>}
            <br />
            <div className="courses-wthout-spec">
                {student.coursesWithoutSpecialization.length != 0 && <h2>Курсы без специализации</h2>}
                {student.coursesWithoutSpecialization.map(course => <Course key={Math.random() * 1000} course={course}/>)}
            </div>
        </div>
    )
}

export default StudentCard;