import * as React from 'react';
import { Icon } from 'antd';
import s from './AppError.scss';
import { FallbackComponentProps } from '../types';
const { useState, useCallback } = React;

interface AppErrorProps extends FallbackComponentProps {}

const AppError = ({ error, info }: AppErrorProps) => {
  const [isVisible, setVisible] = useState(false);

  if (!isVisible) return null;
  if (process.env.ENVIRONMENT === 'production') {
    return (
      <div className={s.errorContainer__production}>
        <h1>
          <Icon type="frown-o" style={{ marginRight: 10 }} />
          {`Sorry, something went wrong.`}
        </h1>
        <p>{`We're working on it and we'll get it fixed as soon as we can.`}</p>
        <i onClick={useCallback(() => setVisible(false), [])}>Hide error</i>
      </div>
    );
  }
  return (
    <div className={s.errorContainer}>
      <div className={s.errorContainer}>
        <b>{error.message}</b>
        {info.componentStack.split(/\r?\n/).map((line: React.ReactNode) => (
          <p>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default AppError;
