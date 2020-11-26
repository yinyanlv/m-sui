import React, { useState, useImperativeHandle, forwardRef, ComponentPropsWithoutRef, useEffect } from 'react';
import './PopupModal.scss';
import { addClass, removeClass, stopPropagation } from '../common';
import { useUtils } from '../hooks';

interface PopupModalProps extends ComponentPropsWithoutRef<'div'> {
    title: string;
    onShow?: Function;
    onHide?: Function;
}

function Modal(props: PopupModalProps, parentRef) {
    const [isShow, setIsShow] = useState(false);
    const [curBodyScrollTop, setCurBodyScrollTop] = useState<any>();
    const [curTop, setCurTop] = useState<any>();
    const {prefixCls} = useUtils();
    const bodyCls = `${prefixCls}modal-opened`;

    useImperativeHandle(parentRef, () => {
        return {
            show: () => {
                const scrollTop = document?.scrollingElement?.scrollTop || document.body.scrollTop;
                const top = document.body.style.top || 0;
                setCurBodyScrollTop(scrollTop);
                setCurTop(top);
                setIsShow(true);
                addClass(document.body, bodyCls);
                document.body.style.top = `-${scrollTop}px`;
                props.onShow?.();
            },
            hide: () => {
                setIsShow(false);
                recoverBody();
                props.onHide?.();
            }
        };
    }, [props.onShow, props.onHide]);

    useEffect(() => {
        return () => {
            recoverBody();
        };
    }, []);

    function handleClickClose() {
        setIsShow(false);
        props.onHide?.();
        recoverBody();
    }

    function recoverBody() {
        removeClass(document.body, bodyCls);
        document.body.scrollTop = curBodyScrollTop;
        if (document?.scrollingElement) {
            document.scrollingElement.scrollTop = curBodyScrollTop;
        }
        document.body.style.top = curTop;
    }

    return (
        <div className={`${prefixCls}popup-modal`}>
            {
                isShow && (
                    <>
                        <div className={'modal-bg'} onClick={handleClickClose}>
                            <div className={'modal'} onClick={stopPropagation}>
                                <div className={'modal-title'}>
                                    <span className={'title'}>{props.title}</span>
                                    <span className={'btn'} onClick={handleClickClose}>关闭</span>
                                </div>
                                <div className={'modal-content'}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );

}

export default React.memo(forwardRef(Modal));
