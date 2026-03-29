import { useCallback, useState } from "react"
import { useTaskContext } from "../context/TaskContext"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { formatDate } from "../utils/helper"
import { Modal } from "../components/Modal"

export const TrashView = () => {
    const { trash, restoreTask, emptyTrash } = useTaskContext()
    const [showEmptyConfirm, setShowEmptyConfirm] = useState(false)

    const handleRestore = useCallback((taskId) => {
        restoreTask(taskId);
    }, [restoreTask]);

    const handleEmptyTrash = useCallback(() => {
        emptyTrash();
        setShowEmptyConfirm(false);
    }, [emptyTrash]);

    return (
        <div className="page-container">
            <Navbar />
            <main className="main-content">
                <div className="page-header">
                    <h1>Trash</h1>
                    <p className="page-subtitle">
                        {trash.length} deleted items
                    </p>
                </div>

                {/* Trash Actions */}
                {trash.length > 0 && (
                    <div className="trash-actions">
                        <button
                            className="btn-empty-trash"
                            onClick={() => setShowEmptyConfirm(true)}
                        >
                            🗑️ Empty Trash
                        </button>
                    </div>
                )}

                {/* trash items */}
                <section className="trash-section">
                    {trash.length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-message">Trash is empty</p>
                        </div>
                    ) : (
                        <div className="trash-list">
                            {trash.map(task => (
                                <div key={task.id} className="trash-item">
                                    <div className="trash-content">
                                        <h3>{task.title}</h3>
                                        {task.description && (
                                            <p className="trash-description">{task.description}</p>
                                        )}
                                        <small className="trash-date">
                                            Deleted: {formatDate(task.deletedAt)}
                                        </small>
                                    </div>
                                    <button
                                        className="btn-restore"
                                        onClick={() => handleRestore(task.id)}
                                        aria-label={`Restore ${task.title}`}
                                    >
                                        ↩️ Restore
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            {/* Empty Trash Confirmation Modal */}
            <Modal
                isOpen={showEmptyConfirm}
                onClose={() => setShowEmptyConfirm(false)}
                title="Empty Trash?"
            >
                <div className="confirm-dialog">
                    <p>This will permanently delete all items in the trash. This action cannot be undone.</p>
                    <div className="modal-footer">
                        <button
                            className="btn-cancel"
                            onClick={() => setShowEmptyConfirm(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn-empty-confirm"
                            onClick={handleEmptyTrash}
                        >
                            Empty Trash
                        </button>
                    </div>
                </div>
            </Modal>

            <Footer />
        </div>
    )
}