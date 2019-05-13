import * as React from 'react';
import Logo from 'images/no-logo.png';
import s from './Centered.scss';

interface Props {
  children: any;
}

const Centered = ({ children }: Props) => (
  <div className={s.Centered}>
    <img className={s.Logo} src={Logo} alt="Dot logo" />
    {children}
  </div>
);

export default Centered;
