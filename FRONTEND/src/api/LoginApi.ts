import axios from 'axios';

export default class LoginApi {
  loginAndGetToken = async (data: { email: string; pw: string }) => {
    try {
      const formData = new FormData();
      formData.append('username', data.email);
      formData.append('password', data.pw);

      const res = await axios.post('/api/auth/token', formData, {
        withCredentials: false,
      });

      return res.status === 200 ? res.data : alert('로그인에 실패하였습니다.');
    } catch (error) {
      console.error('loginAndGetToken', error);
      alert('로그인에 실패하였습니다.');
    }
  };

  getUserInfo = async (jwt) => {
    try {
      const res = await axios.get('/api/auth/detail', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: false,
      });

      return res.status === 200 ? res.data : alert('세션이 만료 되었습니다.');
    } catch (error) {
      console.error('getUserInfo', error);
      alert('세션이 만료 되었습니다.');
    }
  };
}
