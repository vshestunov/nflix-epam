
import React from 'react';
import cl from './modal.module.css';

const MyModal = (props) => {

    const rootClasses = [cl.myModal]

    if (props.visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => props.setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

export default MyModal;