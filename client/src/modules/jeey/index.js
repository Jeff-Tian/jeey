import React from 'react';
import Client from '../../Client';
import config from '../../../../config';

export default React.createClass({
    saveJeey: function (event, jeey) {
        event.preventDefault;
    },
    getInitialState: function () {
        return {
            jeey: {
                text: ''
            },
            config: config
        };
    },
    render: function () {
        return (
            <div className="ui container">
                <form className="ui form" action="" onSubmit={(event) => this.saveJeey(event, this.state.jeey)}>
                    <div className="field">
                        <textarea placeholder="来叽歪点什么吧……" value={this.state.jeey.text}></textarea>
                    </div>
                </form>
            </div>
        );
    }
})