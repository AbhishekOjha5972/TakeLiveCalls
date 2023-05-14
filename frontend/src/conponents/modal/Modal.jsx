import React, { useState } from 'react';
import Styles from "./modal.module.css"

function Modal(props) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpen() {
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={handleOpen}>View Details</button>
            {isOpen && (
                <div className={Styles.modal_overlay}  onClick={handleClose}>
                    <div className={Styles.modal} onClick={(e) =>e.stopPropagation()}>
                        <div className={Styles.modal_header}>
                            <h2>{props.title}</h2>
                            <button className={Styles.close_btn} onClick={handleClose}>❌</button>
                        </div>
                        <div className={Styles.modal_body}>{props.children}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;