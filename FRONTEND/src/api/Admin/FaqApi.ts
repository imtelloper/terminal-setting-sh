import axios from 'axios';

export default class FaqApi {
  getFaqLists = async () => {
    try {
      const res = await axios.get('GetFAQList/');
      return res.status === 200 ? 'success' : 'error';
    } catch (error) {
      console.error('error', error);
      return error.message;
    }
  };

  async insertNewFaq(data) {
    try {
      const res = await axios.post('SLAIInsertFAQ/', data);
      return res.status === 200 ? 'success' : 'fail';
    } catch (error) {
      console.error('error', error);
      return error.message;
    }
  }
}
