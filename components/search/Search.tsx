import React, { forwardRef, useState, useCallback, useRef, useImperativeHandle, RefObject } from 'react';
import style from './Search.module.scss';
import { debounce } from '../common';

interface SearchProps {
    placeholder: string;
    onSearch: Function;
    onChange?: Function;
    checkEmpty?: boolean;
    emptyErrorMessage?: string;
    debounceTime?: number;
}

function Search(props: SearchProps, parentRef: RefObject<unknown>) {
    const inputRef: any = useRef();
    const [isShowSearchBtn, setIsShowSearchBtn] = useState(false);
    const debouceTime: number = props.debounceTime || 300;

    const handleFocus = useCallback(() => {
        setIsShowSearchBtn(true);
    }, []);

    const handleBlur = useCallback(() => {
        const val = inputRef.current.value.trim();
        if (val !== '') {
            setIsShowSearchBtn(true);
        } else {
            setIsShowSearchBtn(false);
        }
    }, []);

    const doSearch = useCallback((e) => {
        const val = inputRef.current.value.trim();

        e.preventDefault();

        if (props.checkEmpty) {

            if (val === '') {
                console.log(props.emptyErrorMessage || '请输入');
            } else {
                props.onSearch && props.onSearch(val);
            }

        } else {
            props.onSearch && props.onSearch(val);
        }

        inputRef.current.blur();
    }, [props.onSearch, props.checkEmpty, props.emptyErrorMessage]);

    const handleChange = useCallback(debounce(() => {
        if (props.onChange) {
            const val = inputRef.current.value.trim();
            props.onChange(val);
        }
    }, debouceTime), [props.onChange]);

    useImperativeHandle(parentRef, () => {
        return {
            getValue: (): string => {
                return inputRef.current.value.trim();
            },
            setValue: (val: number | string): void => {
                inputRef.current.value = val;
            },
            focus: (): void => {
                inputRef.current.focus();
            }
        }
    }, []);

    return (
        <div className={style.search}>
            <div className={'input-wrap'}>
                <form action={'/'} onSubmit={doSearch}>
                    <input type="search" autoComplete={'off'} onFocus={handleFocus} onBlur={handleBlur} ref={inputRef} onChange={handleChange} />
                </form>
                {
                    isShowSearchBtn ? (
                        <span className={'btn'} onClick={doSearch}><i className={'iconfont icon-magnifier'} /></span>
                    ) : (
                            <span className={'placeholder'}>
                                <i className={'iconfont icon-magnifier'} /> {props.placeholder}
                            </span>
                        )
                }
            </div>
        </div>
    );
}

export default React.memo(forwardRef(Search));

