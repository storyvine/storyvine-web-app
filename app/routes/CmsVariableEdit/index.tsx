import { ComponentType } from 'react';
import Loadable, { LoadingComponentProps } from 'react-loadable';
import Loading from 'components/Loading';

export default Loadable({
  loader: () => import('modules/CmsVariableEdit' /* webpackChunkName: "CmsVariableEdit" */),
  loading: Loading as ComponentType<LoadingComponentProps>,
});
  