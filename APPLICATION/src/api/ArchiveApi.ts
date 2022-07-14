import axios from 'axios';

export default class ArchiveApi {
  saveData = async (data) => {
    try {

    } catch (error) {
      console.error(error);
    }
  };

  getOneData = async (data) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  findData = async (data) => {
    try {
      const formData = new FormData();
      formData.append('date', data.date);
      const res = await axios.post('/api/archive/find', data, {
        withCredentials: false,
      });
      return res.status === 200 ? res.data : 'failed to get data';
    } catch (error) {
      console.error(error);
    }
  };

  modifyOneData = async (data) => {
    try {
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
