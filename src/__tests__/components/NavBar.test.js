import React from "react";
import { mount } from "enzyme";
import { Navbar } from "react-bootstrap";

import NavBar from "../../components/NavBar";


describe("NewFeedBack Component", () => {
    let wrapper;
    const minProps = {
        showSearch: true,
        handleSearch: jest.fn(),
    };

    it("will render with min props", () => {
        wrapper = mount(<NavBar {...minProps} />);
        expect(wrapper).toMatchSnapshot();
    })
    it("will render NavBar Brand", () => {
        expect(wrapper.find("NavBar").length).toBe(1);
        expect(wrapper.contains(<Navbar.Brand href="/">Astro Customer Feedbacks</Navbar.Brand>)).toBe(true)
    })
    it("will render Search Button", () => {
        expect(wrapper.find("Button").length).toBe(1);
        expect(wrapper.find("Button").props().children).toBe("Search");
    })
})