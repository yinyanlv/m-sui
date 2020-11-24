import React from 'react';
import './NoData.scss';
import { useConfig } from '../hooks';

interface NoDataProps {
    text?: string;
}

function NoData(props: NoDataProps) {
    const config = useConfig();

    return (
        <div  className={`${config.prefixCls}no-data`}>
            <div className={'image-wrap'}>
                <img src={require('../../public/images/no_data.png').default} alt={props.text}/>
            </div>
            <div className={'text'}>{props.text || '暂无数据'}</div>
        </div>
    );
}

export default React.memo(NoData);
