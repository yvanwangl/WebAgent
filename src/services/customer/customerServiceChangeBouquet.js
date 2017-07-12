import request from '../../utils/request';

const API = '/api/customer-service';

export async function querySubscriberBouquet({subscriberId}) {
    return request(`${API}/getCurrentBouquet/${subscriberId}`);
}

export async function queryProducts({businessClass}) {
    return request(`${API}/getProducts/${businessClass}`);
}

export async function doChangeBouquet(values) {
    return request(`${API}/doChangeBouquet`, {
        method: 'post',
        body: JSON.stringify(values)
    });
}



