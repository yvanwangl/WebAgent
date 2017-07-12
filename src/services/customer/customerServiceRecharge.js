import request from '../../utils/request';

const API = '/api/customer-service';

export async function doRecharge(values) {
    return request(`${API}/doRecharge`, {
        method: 'post',
        body: JSON.stringify(values)
    });
}

export async function queryProducts({subscriberId}) {
    return request(`${API}/getCurrentBouquet/${subscriberId}`);
}



