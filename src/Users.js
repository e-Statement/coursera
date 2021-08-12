import { useEffect,useContext,useRef, useState } from 'react';
import {fetchAndParseCsv,findUser,validateUserName} from './utils'
import {AppContext} from './App'

const course = (csvRow) => {
  return {
      username:csvRow[0],
      name:csvRow[3],
      progress:Math.floor(csvRow[11]),
      completed:csvRow[13],
      grade:Math.floor(csvRow[19]),
      sertificateUrl:csvRow[20],
      learningHours:csvRow[12].slice(0,4),
      university:csvRow[6],
      enrollmentTime:csvRow[7],
      classStartTime:csvRow[8],
      classEndTime:csvRow[9],
      lastCourseActivityTime: csvRow[10],
      completionTime:csvRow[18],
      modules:[]
  }
}

const specialization = (csvRow) => {
  return {
      group:csvRow[2],
      username:csvRow[0],
      name:csvRow[3],
      coursesCount:csvRow[9],
      completedCourses:csvRow[8],
      isCompleted:csvRow[10],
      university:csvRow[5]
    }
}

const courseModule = (csvRow) => {
  return {
    userName:csvRow[3],
    courseName:csvRow[5],
    moduleName:csvRow[6],
    lessonName:csvRow[7],
    itemName:csvRow[8],
    itemOrder:csvRow[9],
    attemptGrade:csvRow[10],
    gradeAfterOverride:csvRow[11],
    isAttemptPassed:csvRow[12],
    attemptTimestamp:csvRow[13],
    itemAttemptOrderNumber:csvRow[14]
  }
}

const createItem = (module) => {
  return {
    itemName: module.itemName,
    itemOrder: module.itemOrder,
    attemptGrade: module.attemptGrade,
    gradeAfterOverride: module.gradeAfterOverride,
    isAttemptPassed: module.isAttemptPassed,
    attemptTimestamp: module.attemptTimestamp,
    itemAttemptOrderNumber: module.itemAttemptOrderNumber
  }
}

const createLesson = (module) => {
  return {
    lessonName:module.lessonName,
    items: []
  }
}

const createModule = (module) => {
  return {
    courseName:module.courseName,
    moduleName:module.moduleName,
    lessons: []
  }
}


const getCurrentUser = (specializations,courses,modules,username) => {
  var specs = specializations.filter(spec => spec.username === username)
  var cours = courses.filter(cr => cr.username === username)
  let specsWithCourses = []
  for (let i = 0; i < specs.length;i++) {
    specsWithCourses.push({
      name:specs[i].name,
      coursesCount:specs[i].coursesCount,
      completedCourses:specs[i].completedCourses,
      isCompleted:specs[i].isCompleted,
      university:specs[i].university,
      courses:courses.filter(course => course.username === username && specs[i].university.includes(course.university.slice(0,15)))
    })
  }

  let coursesWithoutSpecs = []
  for (let i = 0;i < cours.length;i++) {
    let continued = false;
    for (let k = 0; k < specsWithCourses.length;k++) {
      let filtered = specsWithCourses[k].courses.filter(course => {
        return course.name === cours[i].name
      })

      if (filtered.length !== 0) {
        continued = true;
      }
    }
    if (continued) continue;
    coursesWithoutSpecs.push(cours[i])
  }

  specsWithCourses.push({
    name:"Курсы без специализации",
    courses:coursesWithoutSpecs,
    coursesCount:coursesWithoutSpecs.length,
    completedCourses:coursesWithoutSpecs.filter(el => el.completed === "Yes").length,
    isCompleted: coursesWithoutSpecs.length === coursesWithoutSpecs.filter(el => el.completed === "Yes").length
  })

  for (let i = 0; i < specsWithCourses.length;i++) {
    for (let k = 0; k < specsWithCourses[i].courses.length;k++) {
      console.log(specsWithCourses[i].courses[k].name);
      let mods = modules[username].modules.filter(mod => mod.courseName === specsWithCourses[i].courses[k].name)
      specsWithCourses[i].courses[k].modules = mods
    }
  }


  let res =  {
    specializations:specsWithCourses,
    name:username,
    group:specs[0]?.group
  }
  console.log(res);
  return res;
}

const Users = () => {
    const app = useContext(AppContext)  
    const [isFocused,setIsFocused] = useState(false)
    const searchInput = useRef(null)
    const [specializations,setSpecializations] = useState([]) 
    const [courses,setCourses] = useState([]) 
    const [modules,setModules] = useState([])

    useEffect(async () => {
        await fetchAndParseCsv('specialization.csv')
        .then(async arrays => {
          let specializations = []
          const users = []

          for (let i = 1;i < arrays.length;i++) {

            if (validateUserName(arrays[i][0])) {
              users.push(arrays[i][0])
              let spec = specialization(arrays[i])
              specializations.push(spec)
            }
          }

          setSpecializations(specializations)
          return users;
        })
        .then(async (users) => {
          await fetchAndParseCsv('usage.csv')
          .then(arrays => {
            let courses = []

            for (let i = 1;i < arrays.length;i++) {

              if (validateUserName(arrays[i][0])) {
                let newCourse = course(arrays[i])
                courses.push(newCourse)
                users.push(newCourse.username)
              }
            }

            setCourses(courses)
            app.setUsers([...new Set(users)])
          })
          return users;
        })
        .then(async users => {
          await fetchAndParseCsv('urfu.csv')
          .then(async arrays => {
            let test = {}

            for (let i = 0; i < users.length;i++) {
              let userItems = arrays.filter(array => array[3] === users[i])
              test[users[i]] = {
                modules:[]
              }
              for (let k = 0; k < userItems.length;k++) {
                let row = courseModule(userItems[k])
                let module = createModule(row)
                let item = createItem(row)
                let lesson = createLesson(row)
                
                if (test[users[i]].modules.find(mod => mod.moduleName === module.moduleName)) {
                  let mod = test[users[i]].modules.filter(mod => mod.moduleName === module.moduleName)[0]
                  if (mod.lessons.find(less => less.lessonName === lesson.lessonName)) {
                    mod.lessons.filter(less => less.lessonName === lesson.lessonName)[0].items.push(item)
                  }
                  else {
                    lesson.items.push(item)
                    mod.lessons.push(lesson)
                  }
                }
                else {
                  lesson.items.push(item)
                  module.lessons.push(lesson)
                  test[users[i]].modules.push(module)
                }
                
              }
              
              
            }
            setModules(test)
          })
        })
    },[])

    document.onclick = () => {
        setIsFocused(document.activeElement === searchInput.current)
    }
    
    return (
        <div className="users">
        <input ref={searchInput} id="find" type="text" onChange={(e) => app.setFoundUsers(findUser(e.target.value,app.users))}/>
        <div className="search-list" style={isFocused ? {display:"block"} : {display:"none"}}>

            {
            app.foundUsers.map(user => 
            <button className="users-item" key={Math.random() * 1000} onClick={e => 
              {
                let user = getCurrentUser(specializations,courses, modules,app.users.filter(user => user === e.currentTarget.textContent)[0])
                app.setCurrentUser(user)
              }
            }>{user}</button>
            )
          }

        </div>
      </div>
    )
}




export default Users;