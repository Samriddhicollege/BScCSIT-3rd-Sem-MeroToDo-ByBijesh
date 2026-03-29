import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useTaskContext } from "../context/TaskContext"
import { useCallback, useState } from "react"
import { TaskList } from "../components/TaskList"

export const AllTasks = () => {

    const { tasks } = useTaskContext()
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("priority")

    const activeTasks = tasks.filter(task => !task.completed)
    const completedTasks = tasks.filter(task => task.completed)

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value)
    }, [])

    const handleSortChange = useCallback((e) => {
        setSortBy(e.target.value)
    }, [])

    return (
        <div className="page-container">
            <Navbar />

            <main className="main-content">
                <div className="page-header">
                    <h1>All Tasks</h1>
                    <p>
                        {activeTasks.length} active • {completedTasks.length} completed
                    </p>
                </div>

                {/* search and filter bar */}
                <div className="filter-bar">
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search Tasks..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            aria-label="Search tasks"
                        />
                        {searchTerm && (
                            <button
                                className="btn-clear-search"
                                onClick={() => setSearchTerm("")}
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="sort-box">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            className="sort-select"
                            onChange={handleSortChange}
                        >
                            <option value="priority">Priority</option>
                            <option value="dueDate">Due Date</option>
                            <option value="none">Created Date</option>
                        </select>
                    </div>
                </div>

                {/* active tasks */}
                <section className="task-section">
                    <h2 className="section-title">Active Tasks</h2>
                    <TaskList
                        tasks={activeTasks}
                        searchTerm={searchTerm}
                        sortBy={sortBy}
                        onCategoryClick={(categoryId) => {
                            window.location.href = `/category/${categoryId}`;
                        }}
                    />
                </section>

                {/* completed tasks */}
                {completedTasks.length > 0 && (
                    <section className="task-section completed-section">
                        <h2 className="section-title">Completed Tasks</h2>
                        <TaskList
                            tasks={completedTasks}
                            searchTerm={searchTerm}
                            sortBy={sortBy}
                            onCategoryClick={(categoryId) => {
                                window.location.href = `/category/${categoryId}`;
                            }}
                        />
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}