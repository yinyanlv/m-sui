import React, { PropsWithChildren, useCallback } from 'react';
import style from  './Button.module.scss';

interface ButtonProps {
    onClick?: Function;
}

function Button(props: PropsWithChildren<ButtonProps>) {

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        props.onClick && props.onClick();
    }, [props.onClick]);

    return (
        <div className={style.button} onClick={handleClick}>
            {
                props.children
            }
        </div>
    );
}

export default React.memo(Button);