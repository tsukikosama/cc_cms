import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { PageDataRes, PageQueryParams } from '@/types/global';
import qs from 'query-string';

export interface RoleParams extends PageQueryParams {
  username?: number;
  userType?: number;
}
export function getRolePage(params: RoleParams) {
  return axios.get<PageDataRes<RoleParams>>('/user/page', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
