import { useState } from 'react'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import { TaskProvider } from './context/TaskProvider'
import { BrowserRouter as Route, Router, Routes } from 'react-router-dom'
import { AllTasks } from './pages/AllTasks'
import { TodayView } from './pages/TodayView'
import { CategoryView } from './pages/CategoryView'
import { TrashView } from './pages/TrashView'
import { Settings } from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <Routes>
            {/* layout route: wraps all pages with navbar and footer */}
            <Route path="/" element={<AllTasks />} />

            <Route path='/today' element={<TodayView />} />
            <Route path='/category/:id' element={<CategoryView />} />
            <Route path='/trash' element={<TrashView />} />
            <Route path='/settings' element={<Settings />} />

            {/* 404 fallback */}
            <Route 
              path='*'
              element={
                <div style={{textAlign: 'center', padding: '2rem'}}>
                  <h1>404 - Page Not Found</h1>
                  <a href="/">Go back to all tasks</a>
                </div>
              }
            />

          </Routes>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  )
}

export default App
