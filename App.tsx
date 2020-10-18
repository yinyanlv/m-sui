import React from 'react'
import ReactDOM from 'react-dom';
import style from './App.module.scss';
import {Button, Search} from  './components';

function App() {
    return (
        <section className={style.app}>
            <div className='component'>
                <h3>按钮</h3>
                <div>
                    <Button>按钮</Button>
                </div>
            </div>
            <div className='component'>
                <h3>搜索框</h3>
                <div>
                    <Search placeholder="请输入" onSearch={(val: any) => {
                        console.log(val);
                    }}/>
                </div>
            </div>
        </section>
    );
}

ReactDOM.render(<App/>, document.body);