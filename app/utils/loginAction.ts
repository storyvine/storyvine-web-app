
import Cookie from 'js-cookie';

const loginAction = async (token: string): Promise<void> => {
  Cookie.set('token', token, {
    expires: new Date(new Date().getTime() + 15 * 60 * 1000),
  });
};

export default loginAction;
