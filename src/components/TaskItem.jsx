import { useState } from "react";
import { useTaskContext } from "../context/TaskContext"
import { formatDate, isOverdue } from "../utils/helper";
import { CategoryBadge } from "./CategoryBadge";
import { PRIORITY_COLORS, PRIORITY_LABELS } from "../utils/constants";
import { Modal } from "./Modal";
import { TaskForm } from "./TaskForm";

export const TaskItem = (task, onCategoryClick) => {
    const { updateTask, deleteTask, toggleTaskComplete, categories } = useTaskContext();
    const [showEditForm, setShowEditForm] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const taskCategory = categories.find(c => c.id === task.category)
    const overdue = isOverdue(task.dueDate, task.completed)

    const handleToggleComplete = () => {
        toggleTaskComplete(task.id)
    }

    const handleUpdateTask = (updatedData) => {
        updateTask(task.id, updatedData)
        setShowEditForm(false)
    }

    const handleDelete = () => {
        deleteTask(task.id)
        setShowConfirm(false)
    }
    return(
        <>
            <div className={`task-item ${task.completed ? "completed" : ""}`} >
                <div className="task-content">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleToggleComplete}
                        aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
                    />

                    <div className="task-text">
                        <h3 className="task-title">{task.title}</h3>
                        {task.description && <p className="task-description">{task.description}</p>}

                        <div className="task-meta">
                            {taskCategory && (
                                <button
                                    className="category-link"
                                    onClick={() => onCategoryClick(taskCategory.id)}
                                >
                                    <CategoryBadge category={taskCategory} />
                                </button>
                            )}
                        </div>

                        <span
                            className="priority-badge"
                            style={{backgroundColor: PRIORITY_COLORS[task.priority]}}
                        >
                            {PRIORITY_LABELS[task.priority]}
                        </span>

                        {task.dueDate && (

                            <span className={`due-date ${overdue ? "overdue-text" : ""}`}>
                                {overdue ? '⚠️ ' : '📅 '}
                                {formatDate(task.dueDate)}
                            </span>
                        )}
                    </div>
                </div>

                <div className="task-actions">
                    <button
                        className="btn-icon btn-edit"
                        onClick={() => setShowEditForm(true)}
                        title="Edit task"
                    >
                        ✏️
                    </button>
                    <button
                        className="btn-icon btn-delete"
                        onClick={() => setShowEditForm(true)}
                        title="Delete Task"
                        >
                        🗑️
                    </button>
                </div>
            </div>

            {/* edit modal */}
            <Modal
                isOpen={showEditForm}
                onClose={() => setShowEditForm(false)}
                title="Edit Task"
            >
                <TaskForm 
                    initialTask={task}
                    onSave={handleUpdateTask}
                    onClose={() => setShowEditForm(false)}
                    categories={categories}
                />
            </Modal>

            {/* delete task */}
            <Modal
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                title="Delete Task?"
            >
                <div className="confirm-dialog">
                    <p>This task will be moved to trash</p>
                    <div className="confirm-actions">
                        <button className="btn-confirm" onClick={handleDelete}>
                            Delete
                        </button>
                        <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )

}