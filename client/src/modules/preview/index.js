import React from 'react';
import Client from '../../Client';
import config from '../../../../config';

export default React.createClass({
    getInitialState: function () {
        Client.lessons.get(this.props.params, (lesson) => {
            this.setState({
                lesson: lesson
            });
        });

        return {
            lesson: {},
            config: config
        };
    },
    toggleLessonStatus: function (event, lessonData) {
        event.preventDefault();

        Client.lessons.toggleStatus(lessonData, (result) => {
            this.state.lesson.enabled = !this.state.lesson.enabled;

            this.setState({
                lesson: this.state.lesson
            });
        });
    },
    render: function () {
        let enableButton = <button className="ui right floated positive button" type="submit">Approve (Enable)</button>;
        let disableButton = <button className="ui right floated negative button" type="submit">Disapprove
            (Disable)</button>;
        return (
            <div className="ui container">
                <form action="" onSubmit={(event) => this.toggleLessonStatus(event, this.state.lesson)}>
                    <br />
                    <div className="ui field">
                        Current Status: {this.state.lesson.enabled ? 'Enabled' : 'Disabled'}
                        {this.state.lesson.enabled ? disableButton : enableButton}
                    </div>
                    <br />
                </form>
                <div className="ui container">
                    <iframe
                        src={this.state.config.buzz.public.origin + '/my/play?cat=' + this.props.params.category.toLowerCase() + '&date=' + this.props.params.date + '&level=' + this.props.params.level}
                        className="ui fluid container " style={{'minHeight': '700px'}}></iframe>
                </div>
            </div>
        );
    }
})