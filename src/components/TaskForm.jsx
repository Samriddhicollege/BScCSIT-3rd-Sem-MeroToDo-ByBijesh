import { useState } from "react"
import { PRIORITIES, PRIORITY_LABELS } from "../utils/constants"
import { CategoryBadge } from "./CategoryBadge";

export const TaskForm = ({onSave, onClose, initialTask = null, categories = []} ) => {
    const [formData, setFormData] = useState(
        initialTask || {
            title: "",
            description: "",
            category: categories[0]?.id || 1,
            priority: PRIORITIES.MEDIUM,
            dueDate: "",
        }
    );

    const [newCategoryName, setNewCategoryName] = useState("")
    const [showNewCategory, SetShowNewCategory] = useState(false)
    const [errors, setErrors] = useState({})

    const selectedCategory = categories.find( c => c.id === parseInt(formData.category))

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name] : value
        }))
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ""}))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.title.trim()) {
            newErrors.title = "Title is required"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData)
        }
    }
    
    return (
        <form className="task-form" onSubmit={handleSubmit}>

            {/* title */}
            <div className="form-group">
                <label htmlFor="title">Task Title</label>
                <input 
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter Task Title..."
                    className= {errors.title ? "input-error" : ""}
                 />
                 {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
            
            {/* description */}
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add task details... (Optional)"
                    rows="3"
                 />
            </div>

            {/* Category */}
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange}>
                    {
                        categories.map(
                            cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            )
                        )
                    }
                </select>
                {selectedCategory && (<CategoryBadge category={selectedCategory} />)}
            </div>
            
            {/* priority */}
            <div className="form-group">
                    <label >Priority</label>
                    <div className="priority-options">
                        {Object.entries(PRIORITIES).map(([key, value]) => (
                            <label key={value} className="priority-label">
                                <input 
                                    type="radio"
                                    name="priority"
                                    value={value}
                                    checked={formData.priority === value}
                                    onChange={handleChange}
                                />
                                <span>{PRIORITY_LABELS[value]} </span>
                            </label>
                        )

                        )}
                    </div>
            </div>
            
            {/* due date */}
            <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input 
                    type="date" 
                    name="dueDate" 
                    id="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                 />
            </div>

            {/* form actions */}
            <div className="form-actions">
                <button type="submit" className="btn-submit">
                    {initialTask ? "Update Task" : "Add Task"}
                </button>
                <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            </div>
        </form>
    )
}