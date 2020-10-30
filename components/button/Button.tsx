import React, { PropsWithChildren } from 'react';
import style from './Button.scss';

interface ButtonProps {
    onClick?: Function;
}

function Button(props: PropsWithChildren<ButtonProps>) {

    function handleClick(e: React.MouseEvent) {
        e.stopPropagation();
        props.onClick?.();
    }

    return (
        <div className={style.button} onClick={handleClick}>
            {
                props.children
            }
        </div>
    );
}

export default React.memo(Button);