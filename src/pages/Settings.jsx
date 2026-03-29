import { useState } from "react"
import { useTaskContext } from "../context/TaskContext"
import { useTheme } from "../context/ThemeContext"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Modal } from "../components/Modal"

export const Settings = () => {
    const { theme, toggleTheme } = useTheme()
    const { clearAllData } = useTaskContext()
    const [showClearConfirm, setShowClearConfirm] = useState(false)

    const handleClearData = () => {
        clearAllData();
        setShowClearConfirm(false);
        alert("All data has been cleared.");
    }

    return (
        <div className="page-container">
            <Navbar />

            <main className="main-content">
                <div className="page-header">
                    <h1>Settings</h1>
                    <p className="page-subtitle">Manage your app preferences</p>
                </div>

                {/* settings section */}
                <div className="settings-container">
                    {/* Appearance Section */}
                    <section className="settings-section">
                        <h2 className="settings-section-title">⚙️ Appearance</h2>
                        <div className="settings-item">
                            <div className="settings-item-content">
                                <label htmlFor="theme-toggle">Dark Mode</label>
                                <p className="settings-description">
                                    Current mode: <strong>{theme === 'light' ? 'Light' : 'Dark'}</strong>
                                </p>
                            </div>
                            <button
                                id="theme-toggle"
                                className="btn-toggle"
                                onClick={toggleTheme}
                            >
                                {theme === 'light' ? '🌙 Enable' : '☀️ Disable'}
                            </button>
                        </div>
                    </section>

                    {/* Data Section */}
                    <section className="settings-section">
                        <h2 className="settings-section-title">📊 Data</h2>
                        <div className="settings-item danger-zone">
                            <div className="settings-item-content">
                                <label>Clear All Data</label>
                                <p className="settings-description danger-text">
                                    ⚠️ This will permanently delete all your tasks and preferences. This action cannot be undone.
                                </p>
                            </div>
                            <button
                                className="btn-danger"
                                onClick={() => setShowClearConfirm(true)}
                            >
                                Clear Data
                            </button>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="settings-section">
                        <h2 className="settings-section-title">ℹ️ About</h2>
                        <div className="settings-item">
                            <div className="settings-item-content">
                                <label>MeroToDo</label>
                                <p className="settings-description">
                                    A minimalist yet powerful to-do list app built with React
                                </p>
                                <p className="settings-version">Version 1.0.0</p>
                                <p className="settings-credit">
                                    College Project © 2026
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Modal
                isOpen={showClearConfirm}
                onClose={() => setShowClearConfirm(false)}
                title="Clear All Data?"
            >
                <div className="confirm-dialog danger">
                    <p className="confirm-title">⚠️ Are you sure?</p>
                    <p>This will permanently delete:</p>
                    <ul className="confirm-list">
                        <li>All tasks (active and completed)</li>
                        <li>Trash items</li>
                        <li>Your preferences</li>
                    </ul>
                    <p className="confirm-warning">
                        <strong>This action cannot be undone.</strong>
                    </p>
                    <div className="modal-footer">
                        <button
                            className="btn-cancel"
                            onClick={() => setShowClearConfirm(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn-delete-confirm"
                            onClick={handleClearData}
                        >
                            Clear All Data
                        </button>
                    </div>

                </div>
            </Modal>

            <Footer />
        </div>
    )
}