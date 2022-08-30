import axios from 'axios';

export default class BuzzerApi {
  apiTarget = 'buzzer';

  serialSendOn = async (ip) => {
    try {
      const res = await axios.get(`http://${ip}:81/api/${this.apiTarget}/on`);
      return res.status === 200 ? res.data : 'failed buzzer on';
    } catch (error) {
      console.error(error);
      return 'failed buzzer on';
    }
  };

  serialSendOff = async (ip) => {
    try {
      const res = await axios.get(`http://${ip}:81/api/${this.apiTarget}/off`);
      return res.status === 200 ? res.data : 'failed to buzzer off';
    } catch (error) {
      console.error(error);
    }
    return 'failed to buzzer off';
  };
}
