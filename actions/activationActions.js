import { ACTIVATION_ON_SUCCESS, ACTIVATION_IN_PENDING } from '../constants';

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
        await fetch('http://dummy.restapiexample.com/api/v1/employees', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*', 
                'Content-Type': 'application/json',
                'Authorization': 'Basic eyJhbGciOiJIUzI1NiIsInR5cCpXVCJ9.eyJzdWIiOiJkZW1vdXNlcjEiLCJuYW1lIjoiUkFLQkFOSyBEZW1vIiwiaWF0IjoxNTE2MjM5MDIyfQ.hD2So1Jms00c7XB_bxNIrTgvSqMesmrlc0FkBAdY6rM'
            },
            body: JSON.stringify(dataObj)
        })
            .then(res => res.json())
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