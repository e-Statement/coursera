import Chart from "react-apexcharts";
import {coursesGradesChartSettings, coursesGradesPolarChartSettings, coursesChartSettings} from './utils'
import Collapse from "./Collapse";

const Module = ({module}) => {
    const ModuleComponent = () => {
        let assignments = module.assignments
        console.log(module)
        return (<div className="module">
            <table className="lessons">
                <tr>
                    <th>Название</th>
                    <th>Оценка из 100</th>
                    <th>Дата оценки</th>
                    <th>Попытка пройдена</th>
                </tr>
                {assignments.map(assignment => {
                    return (<tr>
                        <td>{assignment.assignmentName}</td>
                        <td>{(assignment.attemptGrade * 100).toFixed(2)}</td>
                        <td>{ Date.parse(assignment.attemptTimestamp) != null && Date.parse(assignment.attemptTimestamp).toString("dd.MM.yyyy")}</td>
                        <td>{assignment.isAttemptPassed ? "Да" : "Нет"}</td>
                    </tr>)
                })}
            </table>
        </div>)
    }

    const Button = () => {
        return (<div className="module-title">
            <h4>{module.moduleName}</h4>
        </div>)
    } 

    return <Collapse 
        component={<ModuleComponent />} 
        buttonClassName="module-button" 
        buttonComponent={<Button />}
        />
}

const Course = ({course}) => {
    const startTime = Date.parse(course.enrollmentTime)
    const endTime = Date.parse(course.completionTime)
    const total = Math.floor(( endTime - startTime ) / 86400000);

    const padezh = (num) => {
        if (num === 12 || num == 11 || num == 13 || num == 14) 
            return `${num} дней`
        switch (num.toString().slice(-1)){
            case '0':
            case '5':
            case '6':
            case '7': 
            case '8': 
            case '9':
                return `${num} дней`
            case '1': 
                return `${num} день`
            case '2':
            case '3':
            case '4': 
                return `${num} дня`
            default: return `${num} дней`
        }
    }

    const CourseComponent = () => {
        return (<div className="course">
            <h4>Дата зачисления на курс: {startTime.toString("dd.MM.yyyy")}</h4>
            {endTime !== null && <h4>{`Студент закончил курс: ${endTime.toString("dd.MM.yyyy")}`}</h4>}
            <h4>{endTime !== null ? `Курс пройден за ${padezh(total)}` : "Студент не прошёл курс"}</h4>
            <h4>Набрано {course.grade} из 100 баллов</h4>
            <h4>Приблизительное количество часов обучения: {course.learningHours}</h4>
            {endTime !== null && <h4><a href={course.sertificateUrl}>Cертификат</a></h4>}
            <h2>Модули</h2>
            {course.modules.map(module => <Module module={module}/>)}
        </div>)
    }

    const Button = () => {

        let color = course.isCompleted ? "#5B8C5A" : "#720026" 

        let styles = {
            width: course.progress + '%',
            backgroundColor: color
        } 

        return (
        <div>
            <div className="course-title">
                <h4>{course.courseName}</h4>
                <h4>Завершено на {course.progress + '%'}</h4>
            </div>
            <div className="course-progress-bar" style={styles}></div>
        </div>)
    } 
    


    return <Collapse 
        component={<CourseComponent />} 
        buttonClassName="course-button" 
        buttonComponent={<Button />}
        />
}

const Specialization = ({specialization}) => {
    const {specializationName,isCompleted,completedCoursesCount,courseCount,courses} = specialization;
    let coursesChart = coursesChartSettings(courses)
    let gradesChart = coursesGradesChartSettings(courses)
    let gradesChartPolar = coursesGradesPolarChartSettings(courses)

    const SpecializationComponent = () => {
        return (<div className="specialization">
                {courses.map(course =><Course key={Math.random() * 1000} course={course}/>)}
            </div>)
    }

    const Button = () => {
        return (<div className="spec-title">
            <h4>{specializationName}</h4>
            <h4>Завершено {completedCoursesCount} из {courseCount}</h4>
        </div>)
    }    

    

    return <Collapse component={<SpecializationComponent />} buttonClassName="spec-button" buttonComponent={<Button />}/>
}

const SpecializationsList = ({specializations}) => {
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

const StudentInfo = ({student}) => {
    console.log(student);
    return (
        <div className="stats">
            <h1>Студент: {student.fullName} {student.group}</h1>
            <br></br>
            <SpecializationsList specializations={student.specializations} />
        </div>
    )
}

export default StudentInfo;

//<Chart className="courses" options={coursesChart.options} series={coursesChart.series} type="bar" height={380} width={"100%"}/>
//<Chart className="grades" options={gradesChart.options} series={gradesChart.series} type="bar" height={400}  width={"100%"}/>
//<Chart className="grades" options={gradesChartPolar.options} series={gradesChartPolar.series} type="polarArea" height={350}  width={"100%"}/>

//<div className="course">
//        <button 
 //       className={isOpen ? "course-button lightened" : "course-button"} onClick={() => setIsOpen(!isOpen)}>
 //           {course.name}, Завершено: {course.completed === "Yes" ? "Да" : "Нет"}</button>
 //   </div>