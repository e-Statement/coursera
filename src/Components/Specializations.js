import Accordion from "./Accordion";
import Course from "./Course";

const Specializations = ({specializations}) => {
    return (
        <div className="specializations">
            <h3 id="specs-title">Специализации</h3>
            <div>
                {specializations.map(spec => 
                    <Specialization key={Math.random() * 1000} specialization={spec}/>
                )}
            </div>
        </div>
    )
}

const Specialization = ({specialization}) => {

    const {title,completedCourseCount,courseCount,courses} = specialization;
    const averageGrade = specialization.courses.map(course => course.grade).reduce((a,b) => a +b , 0) / courseCount;
    const Body = () => {
        return (<div className="specialization">
                {courses.map(course =><Course key={Math.random() * 1000} course={course}/>)}
            </div>)
    }
    const Button = () => {
        return (<div className="spec-title">
            <h5>{title}</h5>
            <div className="spec-stats">
                <h6>Завершено {completedCourseCount || 0} из {courseCount}</h6>
                <h6>Средняя оценка: {averageGrade.toFixed(2)} из 100</h6>
            </div>
        </div>)
    }    
    return <Accordion component={<Body />} buttonClassName="spec-button" buttonComponent={<Button />}/>
}

export default Specializations;