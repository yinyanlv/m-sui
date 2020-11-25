import React from 'react'
import ReactDOM from 'react-dom';
import './App.scss';
import { Button, Search, TabSelector, Dialog, Message, TabPanel, NoData, PopupModal, Loading } from '../components';

function App() {

    const popupRef: any = React.createRef();
    const loadingRef: any = React.createRef();

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
        <section className={'app'}>
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
            <div className="component">
                <h3>TabPanel</h3>
                <div style={{
                    height: '25rem'
                }}>
                    <TabPanel
                        activeCode="1"
                        list={[{ code: 1, name: 2, content: 'abc' }]}
                        renderTab={(item) => {
                            return <div className="tab1">{item.name}</div>;
                        }} 
                        renderContent={(item) => {
                            return <div className="tab1">{item.content}1111</div>;
                        }} 
                        />
                </div>
            </div>
            <div className="component">
                <h3>NoData</h3>
                <div>
                    <NoData/>
                </div>
            </div>
            <div className="component">
                <h3 onClick={() => {
                    popupRef.current.show();
                }}>PopupModal</h3>
                <div>
                    <PopupModal title="这里是标题" ref={popupRef}>
                        这里是内容
                    </PopupModal>
                </div>
            </div>
            <div className="component">
                <h3>Loading</h3>
                <div>
                    <Loading ref={loadingRef} text="加载中..." />
                </div>
            </div>
        </section>
    );
}

ReactDOM.render(<App />, document.body);