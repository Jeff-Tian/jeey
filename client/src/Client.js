const config = require('../../config');

function proxy(method, url, data) {
    let option = {
        accept: 'application/json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: method
    };

    if (method !== 'GET' && data) {
        option.body = JSON.stringify(data);
    }

    return fetch(url, option);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw new Error(`HTTP 错误: ${response.statusText}`);
    }
}

function parseJSON(response) {
    let clone = response.clone();

    return response.json()
        .then(function (json) {
            return json;
        })
        .catch(function (reason) {
            function throwError(err) {
                throw new Error(`服务器返回了意料之外的数据：${reason}，${err}`);
            }

            return clone.text().then(throwError, throwError);
        });
}

function proxyAndHandle(method, url, data, ctx) {
    ctx && ctx.setState({
        loading: true
    });

    return proxy(method, url, data).then(checkStatus).then(parseJSON)
        .then(function (result) {
            ctx && ctx.setState({
                error: false,
                loading: false,
                success: true
            });

            return result;
        })
        .catch(function (err) {
            ctx && ctx.setState({
                error: true,
                errorMessage: err.message || JSON.stringify(err),
                loading: false
            });

            throw err;
        });
}

const Client = {
    saveJeey: function (data, ctx) {
        return proxyAndHandle('PUT', '/api/jeey', data, ctx);
    },
    getJeey: function (data, ctx) {
        return proxyAndHandle('GET', `/api/jeey/${data.id}`, ctx);
    }
};
export default Client;
