import request from '../../utils/request';

const API = '/api/customer-service';

export async function queryResourceStatus() {
    return request(`${API}/getResourceStatus`);
}

export async function doChangeCard(values) {
    return request(`${API}/doChangeCard`, {
        method: 'post',
        body: JSON.stringify(values)
    });
}



