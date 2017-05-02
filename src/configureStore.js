import { createStore } from 'redux';
import reducers from './reducers/index.js';


export default function configureStore() {
    const store = createStore(reducers);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index').default;

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
