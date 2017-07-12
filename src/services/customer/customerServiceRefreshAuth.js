import request from '../../utils/request';

const API = '/api/customer-service';

export async function doRefreshAuth(values) {
    return request(`${API}/doRefreshAuth`, {
        method: 'post',
        body: JSON.stringify(values)
    });
}



