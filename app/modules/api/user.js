// @flow-weak
import request from './request';

const login = payload =>
  request('/login', {
    apiary: true,
    body: payload,
    method: 'POST',
  });

const logout = () =>
  request('/logout', {
    apiary: true,
    method: 'POST',
  });

export default {
  login,
  logout,
};
