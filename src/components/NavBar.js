
import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const NavBar = ({ handleSearch, showSearch, searchText, handleChange, searchEnabled }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Astro Customer Feedbacks</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/add-new">Add New Feedback</Nav.Link>
                </Nav>
                {showSearch && <Form inline>
                    <FormControl type="text" placeholder="Search Using Email" className="mr-sm-2" value={searchText} onChange={handleChange}/>
                    <Button id="SearchButton" variant="outline-success" onClick={handleSearch} disabled={searchEnabled} >Search</Button>
                </Form>}
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavBar;