import React, { useState, PropsWithChildren, useEffect } from 'react';
import './TabPanel.scss';
import cls from 'classnames';
import { http, stopPropagation } from '../common';
import { Message } from '..';
import { useUtils } from '../hooks';

interface TabPanelProps {
    url?: string;
    list?: TabPanelModel[];
    activeCode?: any;
    title?: any[2],
    onClickItem?: (code?: string | number, item?: TabPanelModel) => void;
    renderTab?: (params: TabPanelModel) => any;
    renderContent?: (params: TabPanelModel | { [key: string]: any }) => any;
}

interface TabPanelModel {
    code: string | number;
    name: string | number;
    content: any;
}

function TabPanel(props: PropsWithChildren<TabPanelProps>) {
    const [activeCode, setActiveCode] = useState(props.activeCode);
    const [list, setList]: any = useState(props.list || []);
    const activeItem = getActiveItem();
    const {prefixCls} = useUtils();

    useEffect(() => {
        setList(props.list);
    }, [props.list]);

    useEffect(() => {
        setActiveCode(props.activeCode);
    }, [props.activeCode]);

    useEffect(() => {
        if (props.url) {
            http.get(props.url)
                .then((res: any) => {
                    if (res) {
                        setList(res);
                    } else {
                        setList(res);
                    }
                })
                .catch((err) => {
                    if (err && err.message) {
                        Message.error(err.message);
                    }
                });
        }
    }, [props.url]);


    function handleClickItem(code, item) {
        if (activeCode !== code) {
            setActiveCode(code);
            props.onClickItem?.(code, item);
        }
    }

    function getActiveItem(): { [key: string]: any } | TabPanelModel {
        const items = list.filter((item) => {

            return item.code === activeCode;
        });

        if (items?.length > 0) {
            return items[0];
        } else {
            return {};
        }
    }

    return (
        <>
            <div className={`${prefixCls}tab-panel`} onClick={stopPropagation}>
                {
                    props.title && (
                        <div className="header-wrap">
                            <div>{props.title[0]}</div>
                            <div>{props.title[1]}</div>
                        </div>
                    )
                }
                <div className="content-wrap">
                    <div className={'item-list'}>
                        {
                            list && list.map((item: TabPanelModel) => {
                                return (
                                    <div className={cls('item', {
                                        active: item.code === activeCode
                                    })}
                                        key={item.code}
                                        onClick={handleClickItem.bind(null, item.code, item)}
                                    >
                                        {props.renderTab ? props.renderTab(item) : item.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={'item-content-wrap'}>
                        {
                            props.renderContent ? props.renderContent(activeItem) : activeItem?.content
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(TabPanel);
