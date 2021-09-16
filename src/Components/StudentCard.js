import Collapse from "./Accordion";
//eslint-disable-next-line
import datejs from 'datejs'
import { useContext} from 'react';
import { AppContext } from '../App'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Specializations from './Specializations'


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
            <Specializations specializations={student.specializations} />
        </div>
    )
}

export default StudentCard;