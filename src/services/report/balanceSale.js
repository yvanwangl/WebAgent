/**
 * Created by yaoyirui on 2017/4/12.
 */
import request from '../../utils/request';
import qs from 'qs';

const API = '/api/partner-balance-sales';

export async function queryBalanceSale(queryParams) {
    return request(`${API}/query`, {
        method: 'post',
        body: JSON.stringify(queryParams)
    });
}
export async function resendMessage(values) {
    return request(`${API}/resendMessage`, {
        method: 'post',
        body: JSON.stringify(values)
    });
}
