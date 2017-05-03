import React            from 'react';
import ReactDOM         from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root             from './containers/Root.jsx';

ReactDOM.render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./containers/Root.jsx', () => {
        const NextApp = require('./containers/Root.jsx').default;

        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
