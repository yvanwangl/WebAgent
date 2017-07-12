import request from '../../utils/request';

const API = '/api/customer-service';

export async function queryAddress() {
    return request('/api/address');
}

export async function doModifyCustomer(values) {
    return request(`${API}/modifyCustomer`, {
        method:'put',
        body: JSON.stringify(values)
    });
}

