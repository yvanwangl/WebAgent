import fetch from "dva/fetch";
import formatErrorCode from "./formatErrorCode";
const {httpServer, defaultOptions} = require('../../system.config');

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log(response);
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default function request(url, options) {
    return fetch(`${httpServer}${url}`, {...defaultOptions, ...options})
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            if(!data.success){
                formatErrorCode(data.errorCode, data.errorLevel);
            }
            return {data};
        })
        .catch(err => ({err}));
}
