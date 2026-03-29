import { useCallback, useMemo } from "react"
import {  useTaskContext } from "../context/TaskContext"
import { isTodayOrNo } from "../utils/helper"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { TaskList } from "../components/TaskList"

export const TodayView = () => {
    const { tasks } = useTaskContext()

    const todayTasks = useMemo(() => {
        return tasks.filter(task => {
            if (task.completed) return false; //if task is already completed, we dont want to show it in today view
            return isTodayOrNo(task.dueDate) //checking if task is due today or overdue, if either is true then we include it in today view
        })
    }, [tasks])

    const completedTodayTasks = useMemo(() => {
        return tasks.filter(task => {
            if (!task.completed) return false;
            return isTodayOrNo(task.dueDate);
        });
    }, [tasks]);

    const handleCategoryClick = useCallback((categoryId) => {
        window.location.href = `/category/${categoryId}`;
    }, []);


    return (
        <div className="page-container">

            <Navbar />

            <main className="main-content">
                <div className="page-header">
                    <h1>Today</h1>
                    <p className="page-subtitle">
                        {todayTasks.length} tasks due today
                    </p>
                </div>

                {/* todays task */}
                <section className="tasks-section">
                    <h2>Your Tasks for Today</h2>
                    {todayTasks.length === 0 && !completedTodayTasks.length ? (
                        <div className="empty-state">
                            <p className="empty-message">You've cleared all tasks for today!</p>
                        </div>
                    ) : (
                        <TaskList
                            tasks={todayTasks}
                            onCategoryClick={handleCategoryClick}
                            sortBy="priority"
                        />
                    )}
                </section>

                {/* completed today tasks */}
                {completedTodayTasks.length > 0 && (
                    <section className="tasks-section completed-section">
                        <h2 className="section-title">Completed Today</h2>
                        <TaskList
                            tasks={completedTodayTasks}
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