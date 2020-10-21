import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';

interface DialogConfig {
    mode?: 'alert' | 'confirm';
    title?: string | number | React.ReactNode;
    content: string | number | React.ReactNode;
    onClickCancel?: () => void;
    onClickConfirm?: () => void;
}

export class Dialog {
    private $node: HTMLElement;
    private config: DialogConfig;
    private isShowed: boolean;

    static alert(config: DialogConfig) {
        const dialog = new Dialog(config);
        dialog.show();
        return dialog;
    }

    static confirm(config: DialogConfig) {
        const dialog = new Dialog(config);
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

    private getDialog(): React.ReactElement{
        const self = this;

        return (
            <div>
                <div>{self.config.title}</div>
                <div>{self.config.content}</div>
                <div>
                    {
                        self.config.mode === 'confirm' ? (
                            <>
                                <span onClick={self.handleClickCancel}>取消</span>
                                <span onClick={self.handleClickConfirm}>确定</span>
                            </>
                        ) : (
                                <span onClick={self.handleClickConfirm}>确定</span>
                            )
                    }
                </div>
            </div>
        );
    }
}
