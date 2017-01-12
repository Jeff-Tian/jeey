const config = require('../../config');

function search(query, cb) {
    return fetch(`api/food?q=${query}`, {
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function listLessons(cb) {
    return fetch(config.serviceUrls.buzz.courses.list.frontEnd, {accept: 'application/json'})
        .then(checkStatus)
        .then(parseJSON)
        .then(cb)
        ;
}

function proxy(url, method, data, cb) {
    let option = {
        accept: 'application/json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method
    };

    if (data) {
        option.body = JSON.stringify(data);
    }

    return fetch(url, option)
        .then(checkStatus)
        .then(parseJSON)
        .then(cb)
        ;
}

function lesson(method, data, cb) {
    return proxy(config.serviceUrls.buzz.courses.list.frontEnd, method, data, cb);
}

function addLesson(data, cb) {
    return lesson('PUT', data, cb);
}

function updateLesson(data, cb) {
    return lesson('POST', data, cb);
}

function toggleStatus(data, cb) {
    return lesson('POST', {
        enabled: !data.enabled,
        category: data.category,
        level: data.level,
        lesson_id: data.lesson_id
    }, cb);
}

function getLesson(data, cb) {
    return proxy(config.serviceUrls.buzz.courses.get.frontEnd.replace(':category', data.category).replace(':level', data.level).replace(':lesson_id', data.lesson_id), 'GET', null, cb);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error: ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

const Client = {

};
export default Client;
