import Papa from 'papaparse'

export const fetchAndParseCsv = async (fileName) => {
    return fetch(fileName)
    .then(resp => resp.text())
    .then(text => {
      let result = Papa.parse(text).data
      return result;
    })
}

export const findUser = (userName , users) => {
    if (userName === "") return []
    let result = users.filter(x => {
        if (x === undefined) return false
        return x.toLowerCase().includes(userName.toLowerCase())
    })

    return result;   
}

export const validateUserName = (name) => {
    return name !== "ANONYMIZED_NAME" && name !== "" && name !== undefined && name !== null
}

export const coursesChartSettings = (courses) => {
    return {
        series:[{
            data:courses.map(course => course.progress)
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
            colors: courses.map(course => course.completed === 'Yes' ? '#7FB069' : '#CA3C25'),
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                    colors: ['#000']
                },
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ": " + val + '%'
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
                categories: courses.map(course => course.name),
                max: 100
            },
            yaxis: {
                labels: {
                    show: false
                }
            },
            title: {
                text: 'Прогрессы курсов',
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
}

export const coursesGradesChartSettings = (courses) => {
    return {
        series:[{
            data:courses.map(course => course.grade)
        }],
        options: {
            chart: {
                width:"50%",
                height:350,
                type: 'bar',
                events: {
                    click:function(chart,w,e){}
                }
            },
            colors:["#204de3"],
            plotOptions: {
                bar: {
                    columnWidth:'75%',
                    distributed: true,
                }
            },
            title: {
                text: 'Оценки курсов',
                align: 'center',
                floating: true
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '15px',
                    colors: ['#000']
                },
                offsetY: -20,
            },
            legend: {
                show: false
            },
            yaxis: {
                max: 100
            },
            xaxis: {
                categories:courses.map(course => [course.name]),
                labels: {
                    style: {
                      colors: ["#000"],
                      fontSize: '15px'
                    }
                  }
            }
        }
    }
}

export const coursesGradesPolarChartSettings = (courses) => {
    return {
        series: courses.map(course => course.grade),
            options: {
              chart: {
                type: 'polarArea',
              },
              stroke: {
                colors: ['#fff']
              },
              title: {
                text: 'Оценки курсов',
                align: 'center',
                floating: true
            },
              labels: courses.map(course => course.name),
              fill: {
                opacity: 0.8
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },  
        }
    }

