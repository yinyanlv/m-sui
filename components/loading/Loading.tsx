import React, { forwardRef, useImperativeHandle, useState } from 'react';
import style from './Loading.module.scss';
import cls from 'classnames';
import { stopPropagation } from '../common';

interface LoadingProps {
    mode?: 'static' | 'fixed';
    text?: string | number;
    isHide?: boolean;
}

function Loading(props: LoadingProps, parentRef) {
    const [isShow, setIsShow] = useState(!props.isHide);

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
            <div className={style.loading}>
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