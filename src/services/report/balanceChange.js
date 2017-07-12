import request from '../../utils/request';
import qs from 'qs';

const API = '/api/partner-balance-change';
export async function getDealers() {
    return request(`${API}/current-and-children-partner`);
}
export async function getAccountTreeNodes({partnerId}) {
    return request(`${API}/partner-organization-staff/${partnerId}`);
}

export async function queryBalanceChange(queryParams){
    return request(`${API}/query`, {
        method: 'post',
        body: JSON.stringify(queryParams)
    })
}
