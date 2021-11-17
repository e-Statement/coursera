import Accordion from "./Accordion";
import Assignments from "./Assignments";

const Course = ({course}) => {
    const startTime = Date.parse(course.enrollmentTime)
    const endTime = Date.parse(course.completionTime)
    const total = Math.floor(( endTime - startTime ) / 86400000);
    

    const CourseComponent = () => {

        return (<div className="course">
            <h4>Дата зачисления на курс: {startTime.toString("dd.MM.yyyy")}</h4>
            {endTime !== null && <h4>{`Студент закончил курс: ${endTime.toString("dd.MM.yyyy")}`}</h4>}
            <h4>{endTime !== null ? `Курс пройден за ${padezh(total)}` : "Студент не прошёл курс"}</h4>
            <h4>Набрано {course.grade.toFixed(2)} из 100 баллов</h4>
            <h4>Приблизительное количество часов обучения: {course.learningHours.toFixed(2)}</h4>
            {endTime !== null && course.certificateUrl && <h4><a href={course.certificateUrl}>Cертификат</a></h4>}
            <h2>Задания</h2>
            {<Assignments assignments={course.assignments}/>}
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
                <h4>{course.title}</h4>
                <h4>Завершено на {course.progress.toFixed(2) + '%'}</h4>
            </div>
            <div className="course-progress-bar" style={styles}></div>
        </div>)
    } 
    


    return <Accordion 
        component={<CourseComponent />} 
        buttonClassName="course-button" 
        buttonComponent={<Button />}
        />
}

const padezh = (num) => {
    if (num === 12 || num === 11 || num === 13 || num === 14) 
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

export default Course;