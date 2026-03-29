export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}> {/*this is the blurry background outside the modal,when clicked will close the modal */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* stopproagation prevents from the onclick event from this div bubling up to parent div, cuz if this is not here, then the parent div onclose whill also trigger making modal useless */}
                {title &&
                    <div className="modal-header">
                        <h2>{title}</h2>
                        <button onClick={onClose}>×</button>
                    </div>
                }
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}