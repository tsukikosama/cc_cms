import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/user/login', data);
}

export function logout() {
  return axios.get<LoginRes>('/user/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/user/menu');
}
