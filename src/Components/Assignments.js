const Assignments = ({assignments}) => {
    let x = []
    return (<table className="assignments">
            <thead>
                <tr>
                    <th>Задание</th>
                    <th>Оценка из 100</th>
                    <th>Дата оценки</th>
                    <th>Попытка пройдена</th>
                </tr>
            </thead>
            <tbody>
            {assignments.map((assignment, i) => {
                const filt = assignments.filter(assign => assign.title === assignment.title)
                i = filt.length
                let cls = "notfinished";
                if (filt.find(assi => assi.isAttemptPassed)) {
                    cls = "finished"
                }

                let grade = 0
                if (assignment.attemptGrade != null)
                    grade = assignment.attemptGrade * 100
                if (assignment.gradeAfterOverride != null)
                    grade = assignment.gradeAfterOverride * 100

                let timestamp = ""
                if (assignment.attemptTimestamp != null
                    && !isNaN(Date.parse(assignment.attemptTimestamp)))
                    timestamp = Date.parse(assignment.attemptTimestamp).toString("dd.MM.yyyy")

                const jsx = <tr key={Math.random() * 1000}>
                {!x.includes(assignment.title) && <td rowSpan={i} className={cls}>{assignment.title}</td>}
                <td>{ grade.toFixed(2) }</td>
                <td>{ timestamp }</td>
                <td>{assignment.isAttemptPassed ? "Да" : "Нет"}</td>
            </tr>;
                x.push(assignment.title)
                return jsx
            })}
            </tbody>
        </table>)   
}

export default Assignments;