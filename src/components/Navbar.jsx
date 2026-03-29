import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useTheme } from "../context/ThemeContext"
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import { TaskForm } from "./TaskForm";

export const Navbar = () => {
    //an array can be destructed using object destructuring syntax as well
    //in objecct destruccturing the names must match the retruning values (returning array for here) but order doesnt matter
    //in array destructuring , name doesnt matter but order matters
    const { toggleTheme, theme } = useTheme();
    const { addTask, categories } = useTaskContext();
    const [showForm, setShowForm] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleAddTask = (taskData) => {
        if (!taskData.title.trim()) return;  // Validate
        if (!taskData.category) {
            alert("Please select a category");
            return;
        }
        addTask(taskData);
        setShowForm(false);
    }

    const handleNavClick = () => {
        setShowMobileMenu(false); // Close menu when a link is clicked
    }

    return (
        //we needed to wrap nav and modal cuz react can return only one thing from a component
        <> {/*react fragment is used to wrap multiple elements, but it doesn't appear in the DOM, making the nav and the modal appear as individual */}
            <nav className="navbar">
                <div className="nav-container">
                    <Link to={"/"} className="nav-logo">
                        <span className="logo-icon">✓</span>
                        <span className="logo-text">MeroToDo</span>
                    </Link>

                    <ul className={`nav-menu ${showMobileMenu ? 'active' : ''}`}>
                        <li>
                            <Link to={"/"} onClick={handleNavClick}>
                                All Tasks
                            </Link>
                        </li>
                        <li>
                            <Link to={"/today"} onClick={handleNavClick}>
                                Today
                            </Link>
                        </li>
                        <li>
                            <Link to={"/trash"} onClick={handleNavClick}>
                                Trash
                            </Link>
                        </li>
                        <li>
                            <Link to={"/settings"} onClick={handleNavClick}>
                                Settings
                            </Link>
                        </li>
                    </ul>

                    <div className="nav-actions">
                        <button className="btn-add" onClick={() => setShowForm(true)}>+ Add Task</button>
                        <button className="btn-theme" onClick={toggleTheme}>
                            {theme === "light" ? '🌙' : '☀️'}
                        </button>
                        <button
                            className={`btn-hamburger ${showMobileMenu ? 'active' : ''}`}
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            aria-label="Toggle navigation menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/*modal shows up only if the showForm is true */}
            <Modal isOpen={showForm} onClose={() => setShowForm(false)} title={"Add New Task"}> {/* the onclose is a callback fn , when the onclose is triggered in the modaljsx this fn runs here at navbar  */}
                <TaskForm
                    onSave={handleAddTask}
                    onClose={() => setShowForm(false)}
                    categories={categories}
                />
            </Modal>
        </>


    )
}