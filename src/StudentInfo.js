import Chart from "react-apexcharts";
import {coursesGradesChartSettings, coursesGradesPolarChartSettings, coursesChartSettings} from './utils'

const SpecializationsList = ({specializations}) => {
    //console.log(specializations);
    return (
        <div className="specializations">
            <h1 id="specs-title">{specializations.length !== 1 ? "Специализации" : "Специализация"}</h1>
            {specializations.filter(spec => spec.courses.length !== 0).map((spec,i) => {
                return (<div>
                    <h2>{spec.name}, Завершено: {spec.isCompleted === "Yes" ? "Да" : "Нет"} ({spec.completedCourses}/{spec.coursesCount})</h2>
                    {spec.courses.map(course => <h4>{course.name}</h4>)}
                </div>)   
            })}
        </div>
    )
}

const Specializations = ({specializations}) => {
    return (
    <div>
        {specializations.length === 0 ? "У этого ученика нет специализаций" : <SpecializationsList specializations={specializations}/>}
    </div>)
}

const StudentInfo = ({student}) => {
    //console.log(student);
    //let coursesChart = coursesChartSettings(student)
    //let gradesChart = coursesGradesChartSettings(student)
    //let gradesChartPolar = coursesGradesPolarChartSettings(student)

    return (
        <div className="stats">
            <h1>Студент: {student.name} {student.group}</h1>
            <br></br>
            <Specializations specializations={student.specializations} />
            
            <div className="charts">
                
            </div>
        </div>
    )
}

export default StudentInfo;
<h2 id="courses-title">Курсы</h2>
//<Chart className="courses" options={coursesChart.options} series={coursesChart.series} type="bar" height={380}/>
//                <Chart className="grades" options={gradesChart.options} series={gradesChart.series} type="bar" height={400}/>
//                <Chart className="grades" options={gradesChartPolar.options} series={gradesChartPolar.series} type="polarArea" height={350}/>