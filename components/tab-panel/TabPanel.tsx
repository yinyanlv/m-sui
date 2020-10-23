import React, { useState, useCallback, PropsWithChildren, useEffect } from 'react';
import style from './TabPanel.module.scss';
import cls from 'classnames';
import { http } from '../common/http';
import { ListModel } from '../common/model';
import { Message } from '..';

interface TabPanelProps {
    url?: string;
    list?: TabPanelModel[];
    activeCode?: any;
    onClickItem?: (code?: string | number, subCode?: string | number) => void;
    render?: (params: TabPanelModel) => any; 
}

interface TabPanelModel {
    code: string | number;
    name: string | number;
    content: any;
}

function TabPanel(props: PropsWithChildren<TabPanelProps>) {
    const [activeCode, setActiveCode] = useState(props.activeCode);
    const [list, setList]: any = useState(props.list || []);

    const handleClickContent = useCallback((e) => {
        e.stopPropagation();
    }, []);

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

    const handleClickItem = useCallback((code) => {
        if (activeCode !== code) {
            setActiveCode(code);
            if (props.onClickItem) {
                props.onClickItem(code);
            }
        }
    }, [activeCode, props.onClickItem]);

    return (
        <>
            <div className={style.tabPanel} onClick={handleClickContent}>
                <div className={'item-wrap'}>
                    {
                        list && list.map((item: TabPanelModel) => {
                            return (
                                <div className={cls('item', {
                                    active: item.code === activeCode 
                                })}
                                    key={item.code}
                                    onClick={handleClickItem.bind(null, item.code)}
                                >
                                    {item.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={'item-content-wrap'}>
                    {
                        list && list.filter((item: TabPanelModel) => {
                            if (item.code === activeCode) {
                                return  item.content;
                            } else {
                                return '';
                            }
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default React.memo(TabPanel);
