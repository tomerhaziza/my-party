// App
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { paths } from 'utils/constants';

// Components Imports
import Login from 'components/Login/Login';
import Events from 'components/Events/Events';
import Register from 'components/Register/Register';

const RouterConfig = () => {
  return (
    <Switch>
      <Route path={paths.homePath} component={Events} exact />
      <Route path={paths.loginPath} component={Login} exact />
      <Route path={paths.registerPath} component={Register} exact />
      <Redirect from="**" to={paths.homePath} exact />
    </Switch>
  );
};

export default RouterConfig;
