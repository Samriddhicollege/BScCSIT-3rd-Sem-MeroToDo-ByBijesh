import { useTaskContext } from "../context/TaskContext"

export const Footer = () => {
    const { tasks } = useTaskContext(); //destructing the tasks arrays from the taskcontext value
    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-text">
                    {tasks.length} tasks • {completedCount} completed
                </p>
                <p className="footer-credit">
                    MeroToDo © 2026 • College Project
                </p>
            </div>
        </footer>
    )
}