'use strict';

import React from 'react';
import Client from '../../Client';
import classNames from 'classnames';

export default React.createClass({
    saveJeey: function (event) {
        let self = this;
        event.preventDefault();

        Client.saveJeey(this.state.jeey, this)
            .then(function (result) {
                console.log(result);
            })
        ;
    },
    handleJeeyChange: function (event) {
        this.setState({
            jeey: {
                text: event.target.value
            }
        });
    },
    getInitialState: function () {
        return {
            jeey: {
                text: ''
            }
        };
    },
    render: function () {
        return (
            <div className="ui container">
                <form className={classNames({
                    'ui': true,
                    'form': true,
                    'error': this.state.error,
                    'loading': this.state.loading
                })} action="" onSubmit={this.saveJeey}>
                    <div className="ui error message">
                        <p>{this.state.errorMessage}</p>
                    </div>
                    <div className="field">
                        <textarea placeholder="来叽歪点什么吧……" value={this.state.jeey.text}
                                  onChange={this.handleJeeyChange}></textarea>
                    </div>
                    <div className="field">
                        <button type="submit" className="ui fluid positive button">保存</button>
                    </div>
                </form>
            </div>
        );
    }
})