import React from 'react';
import styles from './NoData.scss';

interface NoDataProps {
    text?: string;
}

function NoData(props: NoDataProps) {
    return (
        <div  className={styles.noData}>
            <div className={'image-wrap'}>
                <img src={require('../../public/images/no_data.png').default} alt={props.text}/>
            </div>
            <div className={'text'}>{props.text || '暂无数据'}</div>
        </div>
    );
}

export default React.memo(NoData);
