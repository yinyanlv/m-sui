import React from 'react';
import styles from './NoData.module.scss';

interface NoDataProps {
    text?: string;
}

function NoData(props: NoDataProps) {
    return (
        <div  className={styles.noData}>
            <div className={'image-wrap'}>
                <img src={'../../public/images/no_data.png'} alt={props.text}/>
            </div>
            <div className={'text'}>{props.text || '暂无数据'}</div>
        </div>
    );
}

export default React.memo(NoData);
