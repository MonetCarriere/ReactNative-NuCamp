import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';


const { persistor, store } = ConfigureStore();

export default function App() {
    return (
        <Provider store={store}>
          <PersistGate
                loading={<Loading />}
                persistor={persistor}>
                <Main />
            </PersistGate>
      </Provider>
    );
}

//Wrapping the Main Component with the Provider gives the Main Component and all of it's child components the ability to connect to the redux store

//After doing this you still have to go to each component you want to connect individually and set up that connection.