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
    return Object.keys(users).filter(x => x.toLowerCase().includes(userName.toLowerCase()))
}

export const validateUserName = (name) => {
    return name !== "ANONYMIZED_NAME" && name !== "" && name !== undefined && name !== null
}

export const coursesChartSettings = (student) => {
    return {
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
            colors: student.courses.map(course => course.completed == 'Yes' ? '#7FB069' : '#CA3C25'),
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
}