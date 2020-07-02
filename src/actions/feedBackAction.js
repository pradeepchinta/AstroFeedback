
export const fetchFeedBacks = () => {
    return (dispatch) => {
        return fetch('http://localhost:8080/astro/feedback/all/', {
            method: 'get',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(response => response.json())
            .then(data => {
                dispatch({
                    type: 'FETCH_FEEDBACKS_SUCCESS',
                    payload: data
                })
            }).catch(() => {
                dispatch({
                    type: 'FETCH_FEEDBACKS_FAILURE',
                    payload: { message: "Something went Wrong, unable to fetch Records", variant: "danger" }
                })
            })
    };
}


export const saveFeedback = (feedback) => {
    return (dispatch) => {
        return fetch('http://localhost:8080/astro/feedback/add', {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(feedback)
        }).then(response => response)
          .then(() => {
                dispatch({
                    type: 'SUCCESS_SAVE_FEEDBACK',
                    payload: { message: "FeedBack Created Sucessfully", variant: "success" }
                })
            }).catch((e) => {
                console.log(e);
                dispatch({
                    type: 'FAILURE_SAVE_FEEDBACK',
                    payload: { message: "Something went Wrong, please try again later", variant: "danger" }
                })
            })
    };
}

export const updateFeedback = (feedback) => {
    return (dispatch) => {
        return fetch(`http://localhost:8080/astro/feedback/update`, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        }).then(response => response.json())
            .then(() => {
                dispatch(fetchFeedBacks())
            }).catch(() => {
                dispatch(fetchFeedBacks())
            })
    };
}

export const searchFeedbacks = (searchText) => {
    return (dispatch) => {
        return dispatch({
            type: 'SEARCH_FEEDBACK',
            payload: searchText
        })
    };
}

export const hideMessage = () => {
    return (dispatch) => {
        return dispatch({
            type: 'HIDE_FEEDBACK_MESSAGE',
        })
    };
}

export const showMessage = (data) => {
    return (dispatch) => {
        return dispatch({
            type: 'SHOW_ERROR_MESSAGE',
            payload: data
        })
    };
}