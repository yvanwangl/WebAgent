import request from '../../utils/request';

export async function queryVoucherCards() {
    return request('/api/card-sale/getAllE-cardSpec');
}

export async function getCurrentUser() {
    return request('/api/user-info/get-current-user');
}

export async function cardSale(cardSaleData) {
    return request('/api/card-sale/cardSale',{
        method: 'post',
        body: JSON.stringify(cardSaleData)
    });
}

