import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('Should render correctly', () => {
  test('When auth has not been fetched', () => {
    const wrapper = shallow(<Header auth={null} />);
    expect(wrapper).toMatchSnapshot();
  });
  test('When auth has been fetched and is true', () => {
    const wrapper = shallow(<Header auth />);
    expect(wrapper).toMatchSnapshot();
  });
  test('When auth has been fetched and is false', () => {
    const wrapper = shallow(<Header auth={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
