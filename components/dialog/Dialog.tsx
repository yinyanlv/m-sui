import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import style from './Dialog.module.scss';
import { stopPropagation } from '../common';

interface DialogConfig {
    type?: 'alert' | 'confirm';
    title?: string | number | React.ReactNode;
    content: string | number | React.ReactNode;
    onClickCancel?: () => void;
    onClickConfirm?: () => void;
    cancelBtnText?: string;
    confirmBtnText?: string;
}

export class Dialog {
    private $node: HTMLElement;
    private config: DialogConfig;
    private isShowed: boolean;

    static alert(config: DialogConfig) {
        const dialog = new Dialog(Object.assign(config, {
            type: 'alert'
        }));
        dialog.show();
        return dialog;
    }

    static confirm(config: DialogConfig) {
        const dialog = new Dialog(Object.assign(config, {
            type: 'confirm'
        }));
        dialog.show();
        return dialog;
    }

    constructor(config: DialogConfig) {
        this.config = config;
        this.$node = document.createElement('div');
    }

    show(): void {
        if (this.isShowed) {
            return;
        }
        document.body.appendChild(this.$node);
        ReactDOM.render(this.getDialog(), this.$node);
        this.isShowed = true;
    }

    hide(): void {
        unmountComponentAtNode(this.$node);
        document.body.removeChild(this.$node);
        this.isShowed = false;
    }

    private handleClickCancel = (e: React.MouseEvent): void => {
        e.stopPropagation();
        if (this.config.onClickCancel) {
            this.config.onClickCancel();
        }
        this.hide();
    }

    private handleClickConfirm = (e: React.MouseEvent): void => {
        e.stopPropagation();
        if (this.config.onClickConfirm) {
            this.config.onClickConfirm();
        }
        this.hide();
    };

    private handleClickDialogBg = (e: React.MouseEvent):void => {
        e.stopPropagation();
        this.hide();
    };


    private getDialog(): React.ReactElement {
        const self = this;
        const title = this.config.title || '提示';
        const cancelText = this.config.cancelBtnText || '取消';
        const confirmText = this.config.confirmBtnText || '确认';

        return (
            <div className={style.dialog} onClick={self.handleClickDialogBg}>
                <div className="dialog-box" onClick={stopPropagation}>
                    <div className="dialog-header">{title}</div>
                    <div className="dialog-content">{self.config.content}</div>
                    <div className="dialog-footer">
                        {
                            self.config.type === 'confirm' ? (
                                <>
                                    <span className="btn" onClick={self.handleClickCancel}>{cancelText}</span>
                                    <span className="btn" onClick={self.handleClickConfirm}>{confirmText}</span>
                                </>
                            ) : (
                                    <span className="btn" onClick={self.handleClickConfirm}>{confirmText}</span>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }
}
