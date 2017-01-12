import React from 'react';

export default React.createClass({
    saveJeey: function (event) {
        event.preventDefault();

        console.log(this.state.jeey);
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
                <form className="ui form" action="" onSubmit={this.saveJeey}>
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