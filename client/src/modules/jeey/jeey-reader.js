'use strict';

import React from 'react';
import Client from '../../Client';
import classNames from 'classnames';

export default React.createClass({
    getInitialState: function () {
        let self = this;

        Client.getJeey(this.props.params, this)
            .then(function (result) {
                self.setState({
                    jeey: {
                        text: result.text
                    }
                });
            });

        return {
            jeey: {
                text: '正在加载中……'
            }
        };
    },
    render: function () {
        return (
            <div className="ui container">
                <div className="ui segment">
                    {this.state.jeey.text}
                </div>
            </div>
        );
    }
})