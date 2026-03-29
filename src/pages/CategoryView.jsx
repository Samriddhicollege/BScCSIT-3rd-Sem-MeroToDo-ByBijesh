import { useNavigate, useParams } from "react-router-dom"
import { useTaskContext } from "../context/TaskContext"
import { useCallback, useMemo } from "react"
import { Navbar } from "../components/Navbar"
import { TaskList } from "../components/TaskList"
import { Footer } from "../components/Footer"

export const CategoryView = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { tasks, categories } = useTaskContext()

    const category = useMemo(() => {
        if (!id || isNaN(parseInt(id))) return null;
        return categories.find(c => c.id === parseInt(id))
    }, [categories, id])

    const categoryTasks = useMemo(() => {
        const categoryId = parseInt(id);
        if (isNaN(categoryId)) return [];
        return tasks.filter(t => t.category === categoryId);
    }, [tasks, id])

    const activeTasks = useMemo(
        () => categoryTasks.filter(t => !t.completed)
        , [categoryTasks]
    )
    const completedTasks = useMemo(
        () => categoryTasks.filter(t => t.completed)
        , [categoryTasks]
    )

    const handleCategoryClick = useCallback((categoryId) => {
        navigate(`/category/${categoryId}`)
    }, [navigate])

    if (!category) {
        return (
            <div className="page-container">
                <Navbar />
                <main className="main-content">
                    <div className="error-state">
                        <p>Category Not Found</p>
                        <button onClick={() => navigate("/")}>
                            Go back to all tasks
                        </button>
                    </div>

                </main>
            </div>
        )
    }



    return (
        <div className="page-container">
            <Navbar />
            <main className="main-content">
                <div className="page-header">
                    <div className="category-header">
                        <div
                            className="category-color-indicator"
                            style={{ backgroundColor: category.color }}
                        />
                        <h1>{category.name}</h1>
                    </div>
                    <p className="page-subtitle">
                        {activeTasks.length} active • {completedTasks.length} completed
                    </p>
                </div>

                {/* active tasks in category */}
                <section className="tasks-section">
                    <h2 className="section-title">Active Tasks</h2>
                    {activeTasks.length === 0 && completedTasks.length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-state">No tasks in this category yet</p>
                        </div>
                    ) : (
                        <TaskList
                            tasks={activeTasks}
                            onCategoryClick={handleCategoryClick}
                            sortBy="priority"
                        />
                    )}
                </section>

                {/* Completed Tasks in Category */}
                {completedTasks.length > 0 && (
                    <section className="tasks-section completed-section">
                        <h2 className="section-title">Completed</h2>
                        <TaskList
                            tasks={completedTasks}
                            onCategoryClick={handleCategoryClick}
                            sortBy="priority"
                        />
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}