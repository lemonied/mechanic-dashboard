import { Home } from './views/home/Home';
import { About } from './views/about/About';
import { Recognition } from './views/recognition/Recognition';
import { Filter } from './views/filter/Filter';

export const routes = [
  {
    path: '/about',
    exact: true,
    Component: About,
  },
  {
    path: '/recognition',
    exact: true,
    Component: Recognition,
  },
  {
    path: '/filter',
    exact: true,
    Component: Filter,
  },
  {
    path: '/',
    exact: false,
    Component: Home,
  },
];
