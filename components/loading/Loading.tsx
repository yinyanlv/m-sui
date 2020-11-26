import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './Loading.scss';
import cls from 'classnames';
import { stopPropagation } from '../common';
import { useUtils } from '../hooks';

interface LoadingProps {
    mode?: 'static' | 'fixed';
    text?: string | number;
    isHide?: boolean;
}

function Loading(props: LoadingProps, parentRef) {
    const [isShow, setIsShow] = useState(!props.isHide);
    const utils = useUtils();

    useImperativeHandle(parentRef, () => {
        return {
            show: () => {
                setIsShow(true);
            },
            hide: () => {
                setIsShow(false);
            }
        };
    }, []);

    return (
        isShow ? (
            <div className={`${utils.prefixCls}loading`}>
                <div className={cls({
                    'fixed': props.mode === 'fixed'
                })} onClick={stopPropagation}>
                    <div className={'inner-wrap'}>
                        <span className="icon-wrap"><i className="iconfont icon-plus" /></span>
                        {
                            props.text && (
                                <span className="text-wrap">{props.text}</span>
                            )
                        }
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default React.memo(forwardRef(Loading));