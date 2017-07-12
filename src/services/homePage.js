import request from '../utils/request';

export async function login(params) {
  return request('/login', {
    method:'post',
    body:JSON.stringify(params)
  });
}

export async function queryIsAdmin() {
  return request('/logout');
}
