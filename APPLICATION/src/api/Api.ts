// eslint-disable-next-line import/no-named-as-default
import LoginApi from './LoginApi';
import ObserveApi from './ObserveApi';

export default class Api {
  static login = new LoginApi();

  static observe = new ObserveApi();
}
