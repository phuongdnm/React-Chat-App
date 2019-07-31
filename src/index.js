import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';
//route
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
// redux
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import rootReducer from './reducers';
import { setUser, clearUser } from './actions';
import Spinner from './Spinner';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/');
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    });
  }
  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser, clearUser }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithAuth />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
