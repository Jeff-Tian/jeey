import React from 'react';
import Jeey from './modules/jeey/index';

const App = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        return (
            <div className='App'>
                <div className='ui container'>
                    <Jeey></Jeey>
                </div>
            </div>
        );
    },
});

export default App;
