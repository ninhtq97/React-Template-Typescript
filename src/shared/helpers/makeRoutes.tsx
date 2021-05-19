import { Route } from 'react-router';
import { IRoute } from 'shared/@types/route';

const makeRoutes = (routes: IRoute[]) =>
  routes.map((r, i) => <Route path={r.path} component={r.component} key={i} />);

export default makeRoutes;
