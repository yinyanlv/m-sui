import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import animate from '@ant-design/css-animation';
import './Message.scss';
import { useUtils } from '../hooks';

interface MessageConfig {
    time?: number; // 毫秒
    type?: 'info' | 'warn' | 'error' | 'success';
    message?: string | number;
}

export class Message {

    private $node: HTMLElement;
    private config: MessageConfig;
    private timerId: number;
    private messageId: string;
    private utils = useUtils();

    static info(msg: string, time: number = 2000) {
        const message = new Message({
            type: 'info',
            message: msg,
            time
        });
        message.show();
        return message;
    }

    static warn(msg: string, time: number = 2000) {
        const message = new Message({
            type: 'warn',
            message: msg,
            time
        });
        message.show();
        return message;
    }

    static error(msg: string, time: number = 2000) {
        const message = new Message({
            type: 'error',
            message: msg,
            time
        });
        message.show();
        return message;
    }

    static success(msg: string, time: number = 2000) {
        const message = new Message({
            type: 'success',
            message: msg,
            time
        });
        message.show();
        return message;
    }

    constructor(config: MessageConfig) {
        this.config = config;
        this.$node = document.createElement('div');
        this.messageId = `msg-${Date.now()}`;
    }

    show(): void {
        document.body.appendChild(this.$node);
        ReactDOM.render(this.getMessage(), this.$node);
        const $msgNode = document.getElementById(this.messageId);

        animate($msgNode, 'enter', () => {
            this.timerId = setTimeout(() => {
                animate($msgNode, 'leave', () => {
                    document.body.removeChild(this.$node);
                    unmountComponentAtNode(this.$node);
                });
            }, this.config.time);
        });
    }

    hide(): void {
        clearTimeout(this.timerId);
        document.body.removeChild(this.$node);
        unmountComponentAtNode(this.$node);
    }

    getMessage(): React.ReactElement {

        return (
            <div className={`${this.utils.prefixCls}message`}>
                <div className="content opacity" id={this.messageId}>
                    <i className={this.getIconClass()} />
                    {this.config.message}
                </div>
            </div>
        );
    }

    getIconClass(): string {

        switch (this.config.type) {
            case 'warn':
                return 'iconfont icon-d-information warn';
            case 'error':
                return 'iconfont icon-d-information error';
            case 'success':
                return 'iconfont icon-d-information success';
            default:
                return 'iconfont icon-d-information info';
        }
    }
}