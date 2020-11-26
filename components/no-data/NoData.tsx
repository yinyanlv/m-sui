import React from 'react';
import './NoData.scss';
import { useUtils } from '../hooks';

interface NoDataProps {
    text?: string;
}

function NoData(props: NoDataProps) {
    const utils = useUtils();

    return (
        <div  className={`${utils.prefixCls}no-data`}>
            <div className={'image-wrap'}>
                <img src={utils.getImage('no_data.png')} alt={props.text}/>
            </div>
            <div className={'text'}>{props.text || '暂无数据'}</div>
        </div>
    );
}

export default React.memo(NoData);
