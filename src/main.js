import 'babel-polyfill';
import React            from 'react';
import ReactDOM         from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App              from './containers/App.jsx';

ReactDOM.render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./containers/App.jsx', () => {
        const NextApp = require('./containers/App.jsx').default;

        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
