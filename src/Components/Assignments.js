const Assignments = ({assignments}) => {
    let i = 0;
    let x = []
    return (<div className="module">
        <table className="lessons">
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
                const filt = assignments.filter(assign => assign.assignmentName === assignment.assignmentName)
                i = filt.length
                let cls = "notfinished";
                if (filt.find(assi => assi.isAttemptPassed)) {
                    cls = "finished"
                }
                const jsx = <tr key={Math.random() * 1000}>
                {!x.includes(assignment.assignmentName) && <td rowSpan={i} className={cls}>{assignment.assignmentName}</td>}
                <td>{(assignment.attemptGrade * 100).toFixed(2)}</td>   
                <td>{ Date.parse(assignment.attemptTimestamp) != null && Date.parse(assignment.attemptTimestamp).toString("dd.MM.yyyy")}</td>
                <td>{assignment.isAttemptPassed ? "Да" : "Нет"}</td>
            </tr>;
                x.push(assignment.assignmentName)
                return jsx
            })}
            </tbody>
        </table>
    </div>)   
}

export default Assignments;