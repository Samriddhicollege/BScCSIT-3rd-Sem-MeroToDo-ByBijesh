import { useMemo } from "react"
import { filterTasksBySearchTerm, sortTasksByDueDate, sortTasksByPriority } from "../utils/helper"
import { TaskItem } from "./TaskItem"
import { useDebounce } from "../hooks/useDebounce"

export const TaskList = ({

    tasks,
    onCategoryClick,
    searchTerm = "",
    sortBy = "priority",
}) => {

    //debouncing the search term to avoid excessive filtering while user is typing
    const debouncedSearchTerm = useDebounce(searchTerm, 300)    

    const processedTasks = useMemo(() => {
        let result = filterTasksBySearchTerm(tasks, debouncedSearchTerm)

        if (sortBy === 'priority') {
            result = sortTasksByPriority(result)
        } 
        else if (sortBy === "dueDate") {
            result = sortTasksByDueDate(result)
        }
        return result
    } , [tasks, debouncedSearchTerm, sortBy])

    if (processedTasks.length === 0) {
        return (
            <div className="empty-state">
            <p className="empty-message">
                {debouncedSearchTerm ? 'No tasks match your search.' : 'No tasks yet. Create one to get started!'}
            </p>
        </div>
        )
    }

    return (
        <div className="task-list">
            {processedTasks.map(task => (
                <TaskItem 
                    key={task.id} //this is not a regular prop, rather its a special prop in react that helps in optimizing the rendering of lists by giving each item a unique identifier
                    task={task}
                    onCategoryClick={onCategoryClick}
                />
            ))}
        </div>
    )

}