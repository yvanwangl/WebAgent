import request from '../../utils/request';

const API = '/api/recharge';

export async function getOrganizationStaffTree() {
    return request(`${API}/rechargeOrganization`);
}

export async function doRecharge(rechargeValues) {
    let rechargeType = rechargeValues['rechargeType'];
    let url = rechargeType=='staff'?`${API}/recharge-for-staff`:`${API}/recharge`;
    return request(url, {
        method: 'post',
        body: JSON.stringify(rechargeValues)
    });
}
