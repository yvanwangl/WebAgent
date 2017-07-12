import request from '../../utils/request';
import qs from 'qs';

const API = '/api/activation-subscriber';
export async function getPartnerStaffs() {
    return request(`${API}/staffs`);
}

export async function getBouquets() {
    return request(`${API}/bouquets`);
}

export async function queryActivationSubscribers(queryParams){
    return request(`${API}/query-activation-subscribers`, {
        method: 'post',
        body: JSON.stringify(queryParams)
    })
}
