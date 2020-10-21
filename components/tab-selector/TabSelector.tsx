import React, { useState, useCallback, PropsWithChildren, useEffect } from 'react';
import style from './TabSelector.module.scss';
import cls from 'classnames';
import { http } from '../common/http';
import { ListModel } from '../common/model';

interface TabSelectorProps {
    url?: string;
    list?: TabSelectorModel[];
    activeParentCode?: any;
    activeChildCode?: any;
    onSelect?: Function;
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

    let title = '';

    if (activeChildCode) {
        const arr = subList.filter((item: ListModel) => {
            return item.code === activeChildCode;
        });

        if (arr && arr.length > 0) {
            title = arr[0].name;
        }
    } else {
        const arr = list.filter((item: TabSelectorModel) => {
            return item.code === activeParentCode;
        });
        if (arr && arr.length > 0) {
            title = arr[0].name;
        }
    }

    if (!activeParentCode && props.allText) {
        title = props.allText;
    }

    const handleClickContent = useCallback((e) => {
        e.stopPropagation();
    }, []);

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
                        console.log(err.message);
                    }
                });
        }
    }, [props.url]);

    const handleClickItem = useCallback((code) => {
        if (activeParentCode !== code) {
            setActiveParentCode(code);
            setActiveChildCode('');
            if (props.onClickItem) {
                props.onClickItem(code);
            }
        }
    }, [activeParentCode, props.onClickItem]);

    const handleClickSubItem = useCallback((code) => {
        setActiveChildCode(code);
        if (props.onClickItem) {
            props.onClickItem(activeParentCode, code);
        }
    }, [activeParentCode, props.onClickItem]);

    return (
        <>
            <div className={style.tabSelector} onClick={handleClickContent}>
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
