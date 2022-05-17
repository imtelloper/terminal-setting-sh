export default class NoticeApi {
  async getNoticesCount() {
    try {
      const res = await fetch('GetNoticeList/?start=0&pageLength=1');
      return res.json();
    } catch (error) {
      console.error('error', error);
    }
  }

  async getNoticeLists(startNum, pageLen) {
    try {
      const res = await fetch(`GetNoticeList/?start=${startNum}&pageLength=${pageLen}`);
      return res.json();
    } catch (error) {
      console.error('error', error);
    }
  }

  async insertNewNotice(data) {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      const res = await fetch('SLAIInsertNotice/', {
        method: 'POST',
        body: formData,
      });
      return res.status === 200 ? 'success' : 'fail';
    } catch (error) {
      console.error('error', error);
    }
  }
}
