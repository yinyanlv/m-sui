import React from 'react';
import style from  './Button.module.scss';

function Button() {
    return (
        <div className={style.button}>这是按钮</div>
    );
}

export default React.memo(Button);