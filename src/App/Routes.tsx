import history from 'browserHistory';
import { Router, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch></Switch>
    </Router>
  );
};

export default Routes;
