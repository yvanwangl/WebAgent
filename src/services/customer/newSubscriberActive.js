import request from '../../utils/request';
import qs from 'qs';

const API = '/api/activateNew';

export async function queryAddress() {
    return request('/api/address');
}

export async function  getCustomerConfig() {
    return request('/api/configuration');
}

export async function queryProducts(values) {
    return request(`${API}/activateProduct?${qs.stringify(values)}`);
}

export async function active(values) {
    return request(`${API}/active`, {
        method:'post',
        body: JSON.stringify(values)
    });
}

