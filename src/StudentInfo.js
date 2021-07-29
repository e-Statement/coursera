import Chart from "react-apexcharts";
import { useEffect, useState } from "react";

const SpecializationsList = ({specializations}) => {
    return (
        <div className="specializations">
            <h2 id="specs-title">Специализации</h2>
            <hr></hr>
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

    let courses = {
            series:[{
                data:student.courses.map(course => course.progress)
            }],
            options:{
                chart:{
                    type:'bar',
                    height:380
                },
                plotOptions: {
                    bar: {
                      barHeight: '100%',
                      distributed: true,
                      horizontal: true,
                      dataLabels: {
                        position: 'bottom'
                      },
                    }
                },
                dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    style: {
                        colors: ['#000']
                    },
                    formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + '%'
                    },
                    offsetX: 0,
                    dropShadow: {
                        enabled: false
                        }
                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                xaxis: {
                    categories: student.courses.map(course => course.name),
                    max: 100
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                title: {
                    text: 'Прогресс курсов',
                    align: 'center',
                    floating: true
                },
                tooltip: {
                    theme: 'dark',
                    x: {
                      show: false
                    },
                    y: {
                      title: {
                        formatter: function () {
                          return ''
                        }
                      }
                    }
                },
                legend: {
                    show: false
                }
                
            }            
    }

    return (
        <div className="stats">
            <Specializations specializations={student.specializations} />
            <hr></hr>
            <h2 id="courses-title">Курсы</h2>
            <Chart options={courses.options} series={courses.series} type="bar" height={380}/>
        </div>
    )
}

export default StudentInfo;