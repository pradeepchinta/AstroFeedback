import React, { useState, useRef, useEffect } from "react";
import { Container, Alert, Form, Button } from "react-bootstrap";
import moment from 'moment';
import { connect } from 'react-redux';

import NavBar from "./NavBar";
import { saveFeedback, hideMessage, showMessage } from '../actions';

export const NewFeedBack = ({ saveFeedback, responseMessage, responseVariant, hideMessage, showMessage }) => {
    const [validated, setValidated] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            hideMessage();
            if (responseMessage === "FeedBack Created Sucessfully") {
                formRef.current.reset();
                setValidated(false);
            }
        }, 2000)
    }, [responseMessage])

    const renderAlert = () => {
        return (
            <Alert variant={responseVariant}>
                {responseMessage}
            </Alert>
        )
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (form.checkValidity() === true) {
            const data = {
                title: form.formBasicTitle.value,
                type: form.formBasicType.value,
                description: form.formBasicDescription.value,
                email: form.formBasicEmail.value,
                date: moment(),
                like: 0,
                disLike: 0
            };
            if (reg.test(form.formBasicEmail.value)) {
                saveFeedback(data);
            } else {
                showMessage({
                    message: "Please enter valid email ...!",
                    variant: "danger"
                })
            }
        }
        setValidated(true);
    };



    return (
        <Container fluid>
            <NavBar showSearch={false} />
            <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="title" placeholder="Title" />
                    <Form.Control.Feedback type="invalid">Please Provide Feedback title</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control required as="select">
                        <option value="">-- Select --</option>
                        <option value="Technical">Technical</option>
                        <option value="User">User</option>
                        <option value="Management Related">Management Related</option>
                        <option value="competitor Related">competitor Related</option>
                        <option value="Pricing issue">Pricing issue</option>
                        <option value="Customer Care issue">Customer Care issue</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">Please Select Feedback type</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" onChange={hideMessage} />
                    <Form.Control.Feedback type="invalid">Please Enter valid Email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required as="textarea" rows="3" />
                    <Form.Control.Feedback type="invalid">Please Enter Feedback Description</Form.Control.Feedback>
                </Form.Group>
                {(responseMessage) && renderAlert()}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
};

const mapStateToProps = (state) => {
    return {
        feedBackList: state.feedBackReducer.feedBackList,
        responseMessage: state.feedBackReducer.responseMessage,
        responseVariant: state.feedBackReducer.responseVariant
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        saveFeedback: (data) => dispatch(saveFeedback(data)),
        hideMessage: () => dispatch(hideMessage()),
        showMessage: (data) => dispatch(showMessage(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewFeedBack);