import Cookies from 'universal-cookie';
import useSWR from 'swr';
import apiList from '../settings/api_list.json';
import {Requests} from '../settings/request.js';

const userFetcher = async (id) => {
    const result = await Requests.get(`${apiList.user}/${id}`);
    return result;
};
const cookie = new Cookies();

export default function useUser() {
  const { data: userInfo, error: userError, mutate } = useSWR(
    cookie.get('token') && localStorage.getItem('uui')
      ? localStorage.getItem('uui')
      : null,
    userFetcher,
    {
      revalidateOnFocus: true,
    },
  );

  const logout = async () => {
    cookie.remove('token', { path: '/' });
    localStorage.clear();
    await mutate(null);
  };

  return {
    userInfo,
    userError,
    logout,
    mutate,
  };
}