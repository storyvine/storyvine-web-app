import { ComponentType } from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';
import Loading from 'components/Loading';

export default Loadable({
  loader: () => import('modules/Login' /* webpackChunkName: "login" */),
  loading: Loading as ComponentType<LoadingComponentProps>,
});
