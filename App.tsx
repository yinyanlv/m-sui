import React from 'react'
import ReactDOM from 'react-dom';
import style from './App.module.scss';
import { Button, Search, TabSelector, Dialog, Message } from './components';

function App() {

    function showDialog() {

        const dialog = Dialog.confirm({
            content: '???',
            onClickCancel: () => {
                Message.error('click cancel');
            },
            onClickConfirm: () => {
                Message.success('click confirm');
            }
        });
    }

    return (
        <section className={style.app}>
            <div className="component">
                <h3>Button</h3>
                <div>
                    <Button onClick={showDialog}>按钮</Button>
                </div>
            </div>
            <div className="component">
                <h3>Search</h3>
                <div>
                    <Search placeholder="请输入" onSearch={(val: any) => {
                        console.log(val);
                    }} />
                </div>
            </div>
            <div className="component">
                <h3>TabSelector</h3>
                <div style={{
                    height: '25rem'
                }}>
                    <TabSelector list={[{ code: 1, name: 2, children: [{ code: 2, name: '1' }] }]} />
                </div>
            </div>
        </section>
    );
}

ReactDOM.render(<App />, document.body);