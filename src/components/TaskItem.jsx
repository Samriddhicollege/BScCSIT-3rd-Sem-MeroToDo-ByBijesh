import { useState } from "react";
import { useTaskContext } from "../context/TaskContext"
import { formatDate, isOverdue } from "../utils/helper";
import { CategoryBadge } from "./CategoryBadge";
import { PRIORITY_COLORS, PRIORITY_LABELS } from "../utils/constants";
import { Modal } from "./Modal";
import { TaskForm } from "./TaskForm";

export const TaskItem = ({ task, onCategoryClick }) => {
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
    return (
        <>
            <div className={`task-item ${task.completed ? "completed" : ""}`} >
                <div className="task-content">
                    {/* checkbox for marking task complete */}
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleToggleComplete}
                        aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
                    />

                    {/* task details */}
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
                            <span
                                className="priority-badge"
                                style={{ backgroundColor: PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium }}
                            >
                                {PRIORITY_LABELS[task.priority] || "Unknown"}
                            </span>

                            {task.dueDate && (

                                <span className={`due-date ${overdue ? "overdue-text" : ""}`}>
                                    {overdue ? '⚠️ ' : '📅 '}
                                    {formatDate(task.dueDate)}
                                </span>
                            )}
                        </div>

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
                        onClick={() => setShowConfirm(true)}
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
                    <p>Are you sure you want to delete "{task.title}"? You can restore it from the trash.</p>
                    <div className="confirm-actions">
                        <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                            Cancel
                        </button>
                        <button className="btn-delete-confirm" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )

}