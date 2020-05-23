import React, { useEffect } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import NotFound from './components/NotFound/NotFound';
import * as actions from './store/actions';
import useErrorHandler from './hooks/http-error-handler';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const isAuthLoading = useSelector((state) => state.auth.loading);
  useErrorHandler();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);
  let routes = null;
  if (!isAuthLoading) {
    routes = (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Redirect from="/signin" to="/" />
          <Redirect from="/signup" to="/" />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      );
    }
  }
  return routes;
};

export default withRouter(App);
