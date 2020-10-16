import React from 'react';
import { shallow, mount } from 'enzyme';
import { Search } from '..';
import { sleep } from '../../../test/utils';


describe('Search', () => {
    const onSearch = jest.fn();
    const placeholder = '请输入';

    it('should render', () => {
        const wrap = shallow(<Search placeholder={placeholder} onSearch={onSearch} />);

        expect(wrap.render()).toMatchSnapshot();
    });

    it('should render without throw', () => {
        const fn = () => {
            shallow(<Search placeholder={placeholder} onSearch={onSearch} />);
        };

        expect(fn).not.toThrow();
    });

    it('placeholder should be set', () => {
        const wrap = shallow(<Search placeholder={placeholder} onSearch={onSearch} />);
        expect(wrap.find('span.placeholder').text().trim()).toEqual(placeholder);
    });

    it('should trigger onSearch when click search button', () => {
        const onSearch = jest.fn();
        const wrap = mount(<Search placeholder={placeholder} onSearch={onSearch} />);

        wrap.find('input').simulate('focus');
        wrap.find('.btn').simulate('click');

        expect(onSearch).toBeCalledTimes(1);
        expect(onSearch).toBeCalledWith('');
    });

    it('should manual set value', () => {
        const ref: any = React.createRef();
        const wrap = mount(<Search placeholder={placeholder} onSearch={onSearch} ref={ref} />)

        ref.current.setValue('test');

        const input: any = wrap.find('input').getDOMNode();

        expect(input.value).toEqual('test');
    });

    it('should trigger onChange', async () => {
        const ref: any = React.createRef();
        const onChange = jest.fn();

        const wrap = mount(<Search placeholder={placeholder} onSearch={onSearch} onChange={onChange} debounceTime={500} ref={ref} />);

        ref.current.setValue('test');
        wrap.find('input').simulate('change');
        expect(onChange).toBeCalledTimes(0);
        // test debounce
        await sleep(1000);
        expect(onChange).toBeCalledTimes(1);
        expect(onChange).lastCalledWith('test');
    });

    it('should preventEvent when submit form', () => {
        const onSearch = jest.fn();
        let prevented = false;
        const wrap = mount(<Search placeholder={placeholder} onSearch={onSearch} />);

        wrap.find('input').simulate('submit', {
            preventDefault: () => {
                prevented = true;
            }
        });

        expect(prevented).toBeTruthy();
    });
});