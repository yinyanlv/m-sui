import React, { useState, useImperativeHandle, forwardRef, ComponentPropsWithoutRef } from 'react';
import style from './PopupModal.module.scss';
import { addClass, removeClass } from '../common';

interface PopupModalProps extends ComponentPropsWithoutRef<'div'> {
    title: string;
    onShow?: Function;
    onClose?: Function;
}

function Modal(props: PopupModalProps, parentRef) {
    const [isShow, setIsShow] = useState(false);
    const [curBodyScrollTop, setCurBodyScrollTop] = useState<any>();
    const [curTop, setCurTop] = useState<any>();
    const bodyCls = 'sui-modal-opened';

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
                props.onClose?.();
            }
        };
    }, [props.onShow, props.onClose]);

    function handleClickClose() {
        setIsShow(false);
        props.onClose?.();
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
        <div className={style.popupModal}>
            {
                isShow && (
                    <>
                        <div className={'modal-bg'} onClick={handleClickClose}>
                            <div className={'modal'}>
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