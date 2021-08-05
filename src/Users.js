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
      learningHours:Math.round((csvRow[12] + Number.EPSILON) * 100) / 100,
      university:csvRow[6]
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


const getCurrentUser = (specializations,courses,username) => {
  var specs = specializations.filter(spec => spec.username === username)
  var cours = courses.filter(cr => cr.username == username)
  console.log(cours);

  let specsWithCourses = []
  for (let i = 0; i < specs.length;i++) {
    specsWithCourses.push({
      name:specs[i].name,
      coursesCount:specs[i].coursesCount,
      completedCourses:specs[i].completedCourses,
      isCompleted:specs[i].isCompleted,
      university:specs[i].university,
      courses:courses.filter(course => course.username === username && specs[i].university.includes(course.university.slice(0,10)))
    })
  }

  let coursesWithoutSpecs = []
  for (let i = 0;i < cours.length;i++) {
    let continued = false;
    for (let k = 0; k < specsWithCourses.length;k++) {
      let filtered = specsWithCourses[k].courses.filter(course => {
        return course.name == cours[i].name
      })

      if (filtered.length != 0) {
        continued = true;
      }
    }
    if (continued) continue;
    coursesWithoutSpecs.push(cours[i])
  }

  //console.log(coursesWithoutSpecs);

  specsWithCourses.push({
    name:"Куры без специализации",
    courses:coursesWithoutSpecs,
    coursesCount:coursesWithoutSpecs.length,
    completedCourses:coursesWithoutSpecs.filter(el => el.completed === "Yes").length,
    isCompleted: coursesWithoutSpecs.length === coursesWithoutSpecs.filter(el => el.completed === "Yes").length
  })


  let res =  {
    specializations:specsWithCourses,
    name:username,
    group:specs[0].group
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

    useEffect(() => {
        fetchAndParseCsv('specialization.csv')
        .then(arrays => {
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
        .then((users) => {
          fetchAndParseCsv('usage.csv')
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
                let user = getCurrentUser(specializations,courses, app.users.filter(user => user === e.currentTarget.textContent)[0])
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