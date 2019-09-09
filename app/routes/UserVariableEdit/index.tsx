import { ComponentType } from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';
import Loading from 'components/Loading';

export default Loadable({
  loader: () => import('modules/UserVariableEdit' /* webpackChunkName: "UserVariableEdit" */),
  loading: Loading as ComponentType<LoadingComponentProps>,
});
  