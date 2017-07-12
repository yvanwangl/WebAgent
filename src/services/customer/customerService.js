import request from '../../utils/request';
import qs from 'qs';

const API = '/api/customer-service';

export async function querySubscribers(queryParams) {
    return request(`${API}/getSubscribers?${qs.stringify(queryParams)}`);
}

export async function querySubscriberInfo({subscriberId}) {
    return request(`${API}/getSubscriberInfo/${subscriberId}`);
}

export async function active(values) {
    return request(`${API}/active`, {
        method:'post',
        body: JSON.stringify(values)
    });
}

