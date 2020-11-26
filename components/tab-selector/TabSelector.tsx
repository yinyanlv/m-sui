import React, { useState, PropsWithChildren, useEffect } from 'react';
import './TabSelector.scss';
import cls from 'classnames';
import { ListModel, http, stopPropagation } from '../common';
import { Message } from '..';
import { useUtils } from '../hooks';

interface TabSelectorProps {
    url?: string;
    list?: TabSelectorModel[];
    activeParentCode?: any;
    activeChildCode?: any;
    allText?: any;
    parentPrefixOptions?: any[];
    childPrefixOptions?: any[];
    onClickItem?: (code?: string | number, subCode?: string | number) => void;
}

interface TabSelectorModel extends ListModel {
    children: ListModel[]
}

function TabSelector(props: PropsWithChildren<TabSelectorProps>) {
    const [activeParentCode, setActiveParentCode] = useState(props.activeParentCode);
    const [activeChildCode, setActiveChildCode] = useState(props.activeChildCode);
    const [list, setList]: any = useState(props.list || []);
    let subList: any = [];
    const {prefixCls} = useUtils();

    if (activeParentCode) {
        let temp = list.filter((item: TabSelectorModel) => {
            return item.code === activeParentCode;
        });
        if (temp && temp[0] && temp[0].children) {
            subList = temp[0].children;
        }
    }

    if (props.childPrefixOptions) {
        subList = [...props.childPrefixOptions, ...subList];
    }

    useEffect(() => {
        setActiveParentCode(props.activeParentCode);
        setActiveChildCode(props.activeChildCode);
    }, [props.activeParentCode, props.activeChildCode]);

    useEffect(() => {
        if (props.url) {
            http.get(props.url)
                .then((res: any) => {
                    if (res) {
                        if (props.parentPrefixOptions) {
                            setList([...props.parentPrefixOptions, ...res]);
                        } else {
                            setList(res);
                        }
                    } else {
                        if (props.parentPrefixOptions) {
                            setList(props.parentPrefixOptions);
                        } else {
                            setList([]);
                        }
                    }
                })
                .catch((err) => {
                    if (err && err.message) {
                        Message.error(err.message);
                    }
                });
        }
    }, [props.url]);

    function handleClickItem(code) {
        if (activeParentCode !== code) {
            setActiveParentCode(code);
            setActiveChildCode('');
            props.onClickItem?.(code);
        }
    }

    function  handleClickSubItem(code) {
        setActiveChildCode(code);
        props.onClickItem?.(activeParentCode, code);
    }

    return (
        <>
            <div className={`${prefixCls}tab-selector`} onClick={stopPropagation}>
                <div className={'item-wrap'}>
                    {
                        list && list.map((item: TabSelectorModel) => {
                            return (
                                <div className={cls('item', {
                                    active: item.code === activeParentCode
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
                <div className={'sub-item-wrap'}>
                    {
                        subList && subList.map((item: ListModel) => {
                            return (
                                <div className={cls('item', {
                                    active: item.code === activeChildCode
                                })}
                                    key={item.code}
                                    onClick={handleClickSubItem.bind(null, item.code)}
                                >
                                    {item.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default React.memo(TabSelector);
