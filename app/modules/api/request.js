// @flow-weak
import Cookies from 'js-cookie';

type Options = {
  apiary?: boolean,
  method?: string,
  body?: Object,
};

const request = (url: string, options: Options = {}) => {
  try {
    const baseUrl = options.apiary ? process.env.APIARY : '/';
    delete options.apiary;
    if (options.body) JSON.stringify(options.body);
    const finalUrl = `${baseUrl}${url}`;
    // HEADERS
    options.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      credentials: 'include',
    };
    const token = Cookies.get('jwt_token');
    if (token) {
      options.headers.authorization = `Bearer ${token}`;
    }

    return fetch(finalUrl, options)
      .then(r => r.json())
      .catch(e => console.log(finalUrl, e));
  } catch (e) {
    // just log some strange errors for now
    console.log(url, e);
  }
};

export default request;
