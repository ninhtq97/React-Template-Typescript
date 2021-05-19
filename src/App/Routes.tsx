import history from 'browserHistory';
import { Router, Switch } from 'react-router-dom';
import makeRoutes from 'shared/helpers/makeRoutes';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>{makeRoutes([])}</Switch>
    </Router>
  );
};

export default Routes;
