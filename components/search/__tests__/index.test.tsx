import React from 'react';
import {mount} from 'enzyme';
import {Search} from '..';


describe('Search', () => {

    it('should render', () => {
        const fn = jest.fn();
        const search = mount(<Search placeholder="请输入" onSearch={fn} />);

        expect(search.render()).toMatchSnapshot();
    });
});