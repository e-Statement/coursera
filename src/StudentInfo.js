import { useState } from "react";
import Chart from "react-apexcharts";
import {coursesGradesChartSettings, coursesGradesPolarChartSettings, coursesChartSettings} from './utils'
import Collapse from "./Collapse";
import datejs from 'datejs'

const Module = ({module}) => {
    const ModuleComponent = () => {
        let items = module.lessons.map(lesson => lesson.items).flatMap(item => item)
        console.log(items);
        return (<div className="module">
            <table className="lessons">
                <tr>
                    <th>Название</th>
                    <th>Оценка из 100</th>
                    <th>Дата оценки</th>
                    <th>Попытка пройдена</th>
                </tr>
                {items.map(item => {
                    return (<tr>
                        <td>{item.itemName}</td>
                        <td>{(item.attemptGrade * 100).toFixed(2)}</td>
                        <td>{ Date.parse(item.attemptTimestamp) != null && Date.parse(item.attemptTimestamp).toString("dd.MM.yyyy")}</td>
                        <td>{item.isAttemptPassed === "Yes" ? "Да" : "Нет"}</td>
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

        let color = course.completed === "Yes" ? "#5B8C5A" : "#720026" 

        let styles = {
            width: course.progress + '%',
            backgroundColor: color
        } 

        return (
        <div>
            <div className="course-title">
                <h4>{course.name}</h4>
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
    const {name,isCompleted,completedCourses,coursesCount,courses} = specialization;
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
            <h4>{name}</h4>
            <h4>Завершено {completedCourses} из {coursesCount}</h4>
        </div>)
    }   

    

    return <Collapse component={<SpecializationComponent />} buttonClassName="spec-button" buttonComponent={<Button />}/>
}

const SpecializationsList = ({specializations}) => {
    let withoutSpec = specializations.filter(spec => spec.name === "Курсы без специализации" && spec.courses.length !== 0);
    return (
        <div className="specializations">
            <h1 id="specs-title">{specializations.length !== 1 ? "Специализации" : "Специализация"}</h1>
            <div >
                {specializations.filter(spec => spec.courses.length !== 0 && spec.name !== "Курсы без специализации").map(spec => {
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
    return (
        <div className="stats">
            <h1>Студент: {student.name} {student.group}</h1>
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