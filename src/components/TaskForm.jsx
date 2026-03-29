import { useCallback, useState } from "react"
import { PRIORITIES, PRIORITY_LABELS } from "../utils/constants"
import { CategoryBadge } from "./CategoryBadge";

export const TaskForm = ({ onSave, onClose, initialTask = null, categories = [] }) => {
    const [formData, setFormData] = useState(() => {
        if (initialTask) {
            return {
                ...initialTask,
                category: Number(initialTask.category)  // Ensure number
            };
        }
        return {
            title: "",
            description: "",
            category: categories.length ? categories[0].id : 1,
            priority: PRIORITIES.MEDIUM,
            dueDate: "",
        };
    });

    const [errors, setErrors] = useState({})

    const selectedCategory = categories.find(c => c.id === parseInt(formData.category))

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        // Convert category to number
        const finalValue = name === "category" ? parseInt(value) : value;

        setFormData(prev => ({ //here we are using () => ({}) for implicit return
            ...prev,
            [name]: finalValue //[name] is a bracket notation for dynamic object keys. 
            // [name] uses the VALUE of the name variable as the key
            //if name = "title" in input tag, then [name] : finalValue will be title: finalValue, which will update the formData.title 
        }))
        if (errors[name]) { //its like error["title"], so this will look up for title key in object, if title exists then its sure that the title was empty
            setErrors(prev => ({ ...prev, [name]: "" })) // Clear error for the field as user types
        }
    }, [errors])

    const validateForm = () => {
        const newErrors = {}
        if (!formData.title.trim()) { //trim removes whitespace from both ends of a string, so if the title is empty or just spaces, formatData.title will be an empty string after trim which is falsy value, so !falsyvalue = true casuing errors state updated with title
            newErrors.title = "Title is required" //this is dynamic property assignment, even if the title key doesnt exist in newerrors, we can create it by assigning it
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0 //object,keys returns an array of keys in the object, so if the length is 0(i.e. title key doesnt exist for errors state), it means there are no errors
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
                    className={errors.title ? "input-error" : ""}
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
                    maxLength="500"
                />
            </div>

            {/* Category */}
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    {categories.length === 0 ? (
                        <option value="">No categories available</option>
                    ) : (
                        categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))
                    )}
                </select>
                {selectedCategory && (<CategoryBadge category={selectedCategory} />)}
            </div>

            {/* priority */}
            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <div className="priority-options">
                    {Object.entries(PRIORITIES).map(([key, value]) => ( //object.entries returns an array of key-value pairs
                        <label key={value} className="priority-label"> {/*key = {value} is for identifying each label uniquely */}
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