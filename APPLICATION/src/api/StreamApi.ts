import axios from 'axios';

export default class StreamApi {
  startRecordVideo = async () => {
    try {
      const res = await axios.get(`http://192.168.0.7:81/api/stream/record-on`);
      return res.status === 200 ? res.data : 'failed record video';
    } catch (error) {
      console.error(error);
    }
  };

  stopRecordVideo = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.7:81/api/stream/record-off`
      );
      return res.status === 200 ? res.data : 'failed record stop';
    } catch (error) {
      console.error(error);
    }
  };
}
