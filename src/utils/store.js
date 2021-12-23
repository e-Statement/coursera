import {useState} from "react";
import React from 'react';

export const FilterContext = React.createContext(null)

export default ({ children }) => {
    const [filters,setFilters] = useState({name: "", specializations:[], courses: [], orderBy:"name", isDescending: false})
    const [students,setStudents] = useState([])

    const store = {
        filters: [filters, setFilters],
        students: [students, setStudents]
    }

    return <FilterContext.Provider value={store}>{children}</FilterContext.Provider>
}