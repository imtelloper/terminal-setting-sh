export default class MainApi {
  async slaiGetCount(data) {
    try {
      const res = await fetch('SLAIGetCount/');
      return res.status === 200 ? res.json() : 'fail';
    } catch (error) {
      console.error('error', error);
    }
  }
}
