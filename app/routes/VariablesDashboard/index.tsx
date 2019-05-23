import { ComponentType } from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';
import Loading from 'components/Loading';

export default Loadable({
  loader: () => import('modules/VariablesDashboard' /* webpackChunkName: "VariablesDashboard" */),
  loading: Loading as ComponentType<LoadingComponentProps>,
});
