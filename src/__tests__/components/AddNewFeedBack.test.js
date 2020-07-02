import React from "react";
import { mount } from "enzyme";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { NewFeedBack } from "../../components/AddNewFeedBack";
import feedBackList from "../../mockData/feedBackList";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe("NewFeedBack Component", () => {
    let wrapper;
    const minProps = {
        feedBackList,
        responseMessage: "Created Successfully",
        responseVariant: "success",
        saveFeedback: jest.fn(),
        hideMessage: jest.fn(),
        showMessage: jest.fn()
    };

    it("will render with min props", () => {
        wrapper = mount(<NewFeedBack {...minProps} store={store} />);
        expect(wrapper).toMatchSnapshot();
    })
    it("will render NavBar Component", () => {
        expect(wrapper.find("NavBar").length).toBe(1);
    })
    it("will Form with fields", () => {
        expect(wrapper.find("Form").length).toBe(1);
        expect(wrapper.find("Form").children().length).toBe(1);
    })
    it("will render Alert Message", () => {
        expect(wrapper.find("Alert").props().children).toBe("Created Successfully");
    })
})