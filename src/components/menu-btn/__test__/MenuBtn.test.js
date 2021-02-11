import React from 'react';
import ReactDom from 'react-dom';

import { getByTestId, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';
import MenuBtn from '../MenuBtn';

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDom.render(<MenuBtn></MenuBtn>,div);
}); // checks that the element renders without crashing (-- Test case 01 --)

it("renders menu btn as it should be with name prop",()=>{
    const {getByTestId}=render(<MenuBtn name="test 02"></MenuBtn>);
    expect(getByTestId("mbtn")).toHaveTextContent("test 02");
}); // checks that given props functions as they should (-- Test case 02 --)

it("renders menu btn as it should be with name prop",()=>{
    const {getByTestId}=render(<MenuBtn name="test 02 dif"></MenuBtn>);
    expect(getByTestId("mbtn")).toHaveTextContent("test 02 dif");
}); // checks that given props functions as they should (-- Test case 02 --) [Negative]

it("matches the snapshot",()=>{
    const tree=renderer.create(<MenuBtn name="test 02"></MenuBtn>).toJSON();
    expect(tree).toMatchSnapshot();
}); // Snap shot matcher






