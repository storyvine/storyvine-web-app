import { userSaga } from 'modules/user';

export default function* rootSaga() {
  yield [...userSaga];
}
