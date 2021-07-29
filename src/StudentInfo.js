import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import {coursesChartSettings} from './utils'

const SpecializationsList = ({specializations}) => {
    return (
        <div className="specializations">
            <h2 id="specs-title">{specializations.length != 1 ? "Специализации" : "Специализация"}</h2>
            {specializations.map(spec => <h3>{spec}</h3>)}
        </div>
    )
}

const Specializations = ({specializations}) => {
    return (
    <div>
        {specializations.length == 0 ? "У этого ученика нет специализаций" : <SpecializationsList specializations={specializations}/>}
    </div>)
}

const StudentInfo = ({student}) => {
    console.log(student);
    let coursesChart = coursesChartSettings(student)

    return (
        <div className="stats">
            <h1>{student.name}</h1>
            <Specializations specializations={student.specializations} />
            <h2 id="courses-title">Курсы</h2>
            <Chart options={coursesChart.options} series={coursesChart.series} type="bar" height={380}/>
        </div>
    )
}

export default StudentInfo;