import React from "react";
import { mount } from "enzyme";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { Home } from "../../components/Home";
import feedBackList from "../../mockData/feedBackList";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe("Home Component", () => {
    let wrapper;

    const minProps = {
        feedBackList,
        responseMessage: "fetched Successfully",
        responseVariant: "success",
        fetchFeedBacks: jest.fn(),
        searchFeedbacks: jest.fn(),
        updateFeedback: jest.fn(),
        hideMessage: jest.fn(),
        showMessage: jest.fn()
    };

    it("will render with min props", () => {
        wrapper = mount(<Home {...minProps} store={store} />);
        expect(wrapper).toMatchSnapshot();
    })
    it("will render NavBar Component", () => {
        expect(wrapper.find("NavBar").length).toBe(1);
    })
    it("will render spinner when no data", () => {
        wrapper.setProps({
            feedBackList: []
        });
        expect(wrapper.find("Spinner").length).toBe(1);
    })
    it(" will render feedbackList with most liked one first", () => {
        wrapper.setProps({
            feedBackList
        });
        expect(wrapper.find("h5").first().props().children).toBe("title 2");
    })
})