import axios from 'axios';

export default class TrackerApi {
  saveData = async (data) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  getAllDatas = async () => {
    try {
      const res = await axios.get(`/api/tracker`);
      return res.status === 200 ? res.data : 'failed to get data';
    } catch (error) {
      console.error(error);
    }
    return 'failed to get datas';
  };

  getOneData = async (id) => {
    try {
      const res = await axios.get(`/api/tracker/${id}`);
      return res.status === 200 ? res.data : 'failed to get data';
    } catch (error) {
      console.error(error);
    }
  };

  findData = async (data) => {
    try {
      const res = await axios.post('/api/tracker/find', data, {
        withCredentials: false,
      });
      return res.status === 200 ? res.data : 'failed to get data';
    } catch (error) {
      console.error(error);
    }
  };

  modifyOneData = async (id, data) => {
    try {
      const res = await axios.patch(`/api/tracker/${id}`, data);
      return res.status === 200 ? res.data : 'failed to modify data';
    } catch (error) {
      console.error(error);
    }
  };

  deleteOneData = async (data) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  getRangeData = async (data) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  getCount = async (data) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };
}
