import axios from 'axios';

export default class ArchiveApi {
  apiTarget = 'archive';

  saveData = async (data) => {
    try {
      const res = await axios.post(`/api/${this.apiTarget}`, data);
      return res.status === 200 ? res.data : 'failed to save data';
    } catch (error) {
      console.error(error);
      return 'failed to save data';
    }
  };

  getAllDatas = async () => {
    try {
      const res = await axios.get(`/api/${this.apiTarget}`);
      return res.status === 200 ? res.data : 'failed to get data';
    } catch (error) {
      console.error(error);
    }
    return 'failed to get datas';
  };

  getOneData = async (id) => {
    try {
      const res = await axios.get(`/api/${this.apiTarget}/${id}`);
      return res.status === 200 ? res.data : 'failed to get data';
    } catch (error) {
      console.error(error);
    }
  };

  findData = async (data) => {
    try {
      const res = await axios.post(`/api/${this.apiTarget}/find`, data, {
        withCredentials: false,
      });
      return res.status === 200 ? res.data : 'failed to get data';
    } catch (error) {
      console.error(error);
    }
  };

  modifyOneData = async (id, data) => {
    try {
      const res = await axios.patch(`/api/${this.apiTarget}/${id}`, data);
      return res.status === 200 ? res.data : 'failed to modify data';
    } catch (error) {
      console.error(error);
      return 'failed to modify data';
    }
  };

  deleteOneData = async (id) => {
    try {
      const res = await axios.delete(`/api/${this.apiTarget}/${id}`);
      return res.status === 200 ? res.data : 'failed to delete data';
    } catch (error) {
      console.error(error);
      return 'failed to delete data';
    }
  };

  getRangeData = async (startNum: number, limitNum: number) => {
    try {
      const res = await axios.get(
        `/api/${this.apiTarget}/${startNum}/${limitNum}`
      );
      return res.status === 200 ? res.data : 'failed to modify data';
    } catch (error) {
      console.error(error);
      return 'failed to get range data';
    }
  };

  getDetailRangeData = async (data) => {
    try {
      console.log('data', data);
      const res = await axios.post(
        `/api/${this.apiTarget}/find-range-data`,
        data
      );
      return res.status === 200 ? res.data : 'failed to modify data';
    } catch (error) {
      console.error(error);
      return 'failed to get range data';
    }
  };

  getCount = async (data) => {
    try {
      const res = await axios.get(`/api/${this.apiTarget}/count/`);
      return res.status === 200 ? res.data : 'failed to get count data';
    } catch (error) {
      console.error(error);
      return 'failed to get count data';
    }
  };
}
