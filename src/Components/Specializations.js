import Accordion from "./Accordion";
import Course from "./Course";

const Specializations = ({specializations}) => {
    let withoutSpec = specializations.filter(spec => spec.specializationName === "Курсы без специализации" && spec.courses.length !== 0);
    let withSpec = specializations.filter(spec => spec.courses.length !== 0 && spec.specializationName !== "Курсы без специализации")
    return (
        <div className="specializations">
            {withSpec.length !== 0 &&  <h1 id="specs-title">{withSpec.length !== 1 ? "Специализации" : "Специализация"}</h1>}
            <div >
                {withSpec.map(spec => {
                    return <Specialization key={Math.random() * 1000} specialization={spec}/>
                })}
            </div>
            <br></br>
            {withoutSpec.length !== 0 && <h1>Курсы без специализации</h1>}
            <div className="without-spec">
                {withoutSpec.map(spec => {
                        return spec.courses.map(course => <Course key={Math.random() * 1000} course={course}/>)
                    })}
            </div>
        </div>
    )
}

const Specialization = ({specialization}) => {
    const {specializationName,completedCoursesCount,courseCount,courses} = specialization;
    const averageGrade = specialization.courses.map(course => course.grade).reduce((a,b) => a +b , 0) / specialization.courses.length;
    const Body = () => {
        return (<div className="specialization">
                {courses.map(course =><Course key={Math.random() * 1000} course={course}/>)}
            </div>)
    }
    const Button = () => {
        return (<div className="spec-title">
            <h4>{specializationName}</h4>
            <div className="spec-stats">
                <h6>Завершено {completedCoursesCount} из {courseCount}</h6>
                <h6>Средняя оценка: {averageGrade} из 100</h6>
            </div>
        </div>)
    }    
    return <Accordion component={<Body />} buttonClassName="spec-button" buttonComponent={<Button />}/>
}

export default Specializations;