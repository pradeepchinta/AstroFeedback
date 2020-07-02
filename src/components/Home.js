import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import { Container, Media, Card, Spinner, Alert, Button } from "react-bootstrap";

import NavBar from "./NavBar";
import { fetchFeedBacks, searchFeedbacks, hideMessage, showMessage, updateFeedback } from '../actions';
import personImage from '../assets/person.png';

export const Home = ({ feedBackList, fetchFeedBacks, searchFeedbacks, responseMessage, responseVariant, showMessage, hideMessage, updateFeedback }) => {

    const [searchText, setSearchText] = useState("");
    const [searchEnabled, setSearchEnabled] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    //const [like, setLike] = useState(0);
    //const [disLike, setDisLike] = useState(0);
    let like = 0;
    let disLike = 0;

    useEffect(() => {
        fetchFeedBacks();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            hideMessage();
        }, 2000)
    }, [responseMessage])

    const handleSearch = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!searchText) {
            fetchFeedBacks();
            setSearchEnabled(false);
            return
        }
        if (reg.test(searchText)) {
            searchText && searchFeedbacks(searchText);
            setSearchEnabled(true);
        } else {
            showMessage({
                message: "Please enter valid email to search ...!",
                variant: "danger"
            })
            setSearchEnabled(false);
        }
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleClick = (e, item) => {
        switch (e.target.name) {
            case "like":
                if (liked) {
                    like = item.like -1;
                    disLike = item.disLike;
                    setLiked(false);
                } else {
                    like = ++item.like;
                    disLike = item.disLike;
                    setLiked(true);
                }
                break;
            case "dislike":
                if (disliked) {
                    disLike = item.disLike -1;
                    like = item.like;
                    setDisliked(false);
                } else {
                    disLike = ++item.disLike;
                    like = item.like;
                    setDisliked(true);
                }
                break;
            default:
                return null;
        };
        const data = {
            id: item.id,
            title: item.title,
            type: item.type,
            description: item.description,
            email: item.email,
            date: item.date,
            like: like,
            disLike: disLike
        };
        updateFeedback(data);
    }

    const compare = (item, item1) => {
        if (item1.like > item.like) return 1;
        if (item.like > item1.like) return -1;
        return 0;
    }

    const renderList = () => {
        return feedBackList && feedBackList.sort(compare).map((item) => {
            return <div key={item.id}>
                <Media as="li">
                    <img
                        width={64}
                        height={64}
                        className="mr-3"
                        src={personImage}
                        alt="Generic placeholder"
                    />
                    <Media.Body>
                        <h5>{item.title}</h5>
                        <strong>{item.type}</strong>
                        <p>{item.description}</p>
                        <p>{item.email}</p>
                        <p>{moment(item.date).format("DD-MM-YYYY")}</p>
                        <Button id="like" onClick={(e) => handleClick(e, item)} variant="outline-primary" type="button" name="like">{`Like ${item.like}`}</Button>{' '}
                        <Button id="dislike" onClick={(e) => handleClick(e, item)} variant="outline-primary" type="button" name="dislike">{`DisLike ${item.disLike}`}</Button>
                    </Media.Body>
                </Media>
                <hr />
            </div >
        })
    };

    const renderSpinner = () => {
        return (
            <React.Fragment>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                {feedBackList && !!feedBackList.length && <h2>We have Empty FeedBack List ...</h2>}
            </React.Fragment>
        )
    };

    const renderAlert = () => {
        return (
            <Alert variant={responseVariant}>
                {responseMessage}
            </Alert>
        )
    };

    return (
        <Container fluid>
            <NavBar handleSearch={handleSearch} showSearch={true} handleChange={handleChange} searchText={searchText} searchEnabled={searchEnabled}/>
            {(responseMessage && responseVariant) && renderAlert()}
            <Card>
                {feedBackList && feedBackList.length ? renderList() : (
                    <div className='spinner'>
                        {searchEnabled ? <h2>No FeedBack List Found</h2> : renderSpinner()}
                    </div>)}
            </Card>
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
        fetchFeedBacks: () => dispatch(fetchFeedBacks()),
        searchFeedbacks: (textSearch) => dispatch(searchFeedbacks(textSearch)),
        updateFeedback: (data) => dispatch(updateFeedback(data)),
        hideMessage: () => dispatch(hideMessage()),
        showMessage: (data) => dispatch(showMessage(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);