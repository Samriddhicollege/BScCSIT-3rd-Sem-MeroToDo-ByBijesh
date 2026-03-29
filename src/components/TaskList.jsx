import { useMemo } from "react"
import { sortTasksByDueDate, sortTasksByPriority } from "../utils/helper"
import { TaskItem } from "./TaskItem"

export const TaskList = ({

    tasks,
    onCategoryClick,
    sortBy = "priority",
    filterCompleted = false,
}) => {

    const filteredAndSortedTasks = useMemo(() => {
        let result = [...tasks]

        //filter completed tasks if needed
        if (filterCompleted === "completed") {
            result = result.filter(t => t.completed)
        }
        else if(filterCompleted === "active"){
            result = result.filter(t => !t.completed)
        }

        //sort by selevted options
        if (sortBy === "priority") {
            result = sortTasksByPriority(result)
        }
        else if(sortBy === "dueDate"){
            result = sortTasksByDueDate(result)
        }
        else if(sortBy === "recent"){
            result = result.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        }

        return result
    }, [tasks, sortBy, filterCompleted] )

    if (!filteredAndSortedTasks || filteredAndSortedTasks.length === 0) {
        return ( 
            <div className="task-list-empty">
                <p>No tasks yet. Create one to get started!</p> 
            </div>
        )
    }

    return (
        <div className="task-list">
            {filteredAndSortedTasks.map(task => (
                <TaskItem 
                    key={task.id}
                    task={task}
                    onCategoryClick={onCategoryClick}
                />
            ))}
        </div>
    )

}