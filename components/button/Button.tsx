import React, { PropsWithChildren } from 'react';
import './Button.scss';
import { useUtils } from '../hooks';

interface ButtonProps {
    onClick?: Function;
}

function Button(props: PropsWithChildren<ButtonProps>) {
    const {prefixCls} = useUtils();

    function handleClick(e: React.MouseEvent) {
        e.stopPropagation();
        props.onClick?.();
    }

    return (
        <div className={`${prefixCls}button`} onClick={handleClick}>
            {
                props.children
            }
        </div>
    );
}

export default React.memo(Button);