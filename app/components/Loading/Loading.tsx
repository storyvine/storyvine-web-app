import * as React from 'react';
import { Spin } from 'antd';
import s from './Loading.scss';
import { LoadingComponentProps } from 'react-loadable';

interface Props extends Partial<LoadingComponentProps> {
  height?: string | number | undefined;
}

const Loading: React.FunctionComponent<Props> = ({ height = '100%' }: Props) => (
  <div style={{ height }}>
    <Spin size="large" className={s.Loading__Spinner} />
  </div>
);

export default Loading;
