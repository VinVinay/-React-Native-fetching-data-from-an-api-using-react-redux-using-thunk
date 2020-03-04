import { ACTIVATION_ON_SUCCESS, ACTIVATION_IN_PENDING, API_URL, TOKEN } from '../constants';

export function setPageList() {
    return {
        type: ACTIVATION_ON_SUCCESS,
    };
}

export function fetchActivationPending() {
    return {
        type: ACTIVATION_IN_PENDING,
    };
}
export function getPageList() {
    var dataObj = {
        "productId": "82jqp008d2l00",
        "emirate": "Abu Dhabi"
      };


    return async dispatch => {
        dispatch(fetchActivationPending());
        await fetch(API_URL, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json',
                'Authorization': TOKEN
            },
            body: JSON.stringify(dataObj)
        })
            // .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                return dispatch(setPageList()) || [];
            })
            .catch(error => {
                console.error(error);
            })
    }
}