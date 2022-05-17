import axios from "axios";

export const getFetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true, // front와 backend간에 도메인이 다르면 쿠키를 주고 받을 수 없는 문제를 해결하기 위함
    })
    .then((res) => res.data);

/* POST도 가능 */
export const postFetcher = (url: string) =>
  axios.post(url, {}).then((res) => res.data);
