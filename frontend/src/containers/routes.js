/**
 * React Router Plain Routes Configuration
 * @see https://github.com/reactjs/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes
 */
import App from './App';
import Home from './Home/Home';
import Counter from './Counter/Counter';
import Todo from './Todo/Todo';
import NotFound from './NotFound/NotFound';

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: Home,
  },
  childRoutes: [
    {
      path: 'counter',
      component: Counter,
    },
    {
      path: 'todo',
      component: Todo,
    },
    {
      path: '*',
      component: NotFound,
      status: 404,
    },
  ],
};
