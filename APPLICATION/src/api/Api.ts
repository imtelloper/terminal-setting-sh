// eslint-disable-next-line import/no-named-as-default
import LoginApi from './LoginApi';
import ObserveApi from './ObserveApi';
import StreamApi from './StreamApi';
import ArchiveApi from './ArchiveApi';
import TrackerApi from './TrackerApi';

export default class Api {
  static login = new LoginApi();

  static observe = new ObserveApi();

  static stream = new StreamApi();

  static archive = new ArchiveApi();

  static tracker = new TrackerApi();
}
