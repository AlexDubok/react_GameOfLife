import React            from 'react';
import ReactDOM         from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import Root             from './containers/Root.jsx';
import configureStore   from './configureStore';

const store = configureStore();

function renderApp(RootComponent) {
    const target = document.getElementById('root');

    if (target) {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <RootComponent store={store} />
                </Provider>
            </AppContainer>,
            target
        );
    }
}

renderApp(Root);

if (module.hot) {
    module.hot.accept(
        './containers/Root.jsx',
        () => renderApp(require('./containers/Root.jsx').default)
    );
}
