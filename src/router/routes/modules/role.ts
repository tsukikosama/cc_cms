import qs from 'query-string';
import axios from 'axios';

export function getMerchantPageReq(params: merchantSearchReq) {
  return axios.get<PageDataRes<MerchantRecord>>('/merchant/page', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function updateMerchantReq(data: MerchantForm) {
  return axios.post('/merchant/update', data);
}

export function saveMerchantReq(data: MerchantForm) {
  return axios.post('/merchant/save', data);
}

export function getMerchantDetail(id: string) {
  return axios.get<MerchantForm>('/merchant/detail', {
    params: {
      id,
    },
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
