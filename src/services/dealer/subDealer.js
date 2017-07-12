import request from '../../utils/request';

const API = '/api/inventory';
export async function getSubDealers() {
    return request(`/api/partner/children-partner`);
}

/*根据合作伙伴id查询组织仓库信息*/
export async function getStockListByPartnerId({partnerId}) {
    return request(`${API}/partner/${partnerId}`);
}
/*根据组织id查询组织仓库信息*/
export async function getStockListByOrganizationId({organizationId}) {
    return request(`${API}/organization/${organizationId}`);
}
/*查询组织树*/
export async function getOrganizationTree() {
    return request('/api/organization');
}
/*组织仓库售出*/
export async function saleStock({sourceOrganizationId, destinationOrganizationId, stocks}) {
    return request(`${API}/operation-change`, {
        method: 'post',
        body: JSON.stringify({
            sourceType: 2,
            sourceOrganizationId,
            destinationOrganizationId,
            partnerInventoryOperationItemReceivers: stocks
        })
    });
}
/*组织仓库退还*/
export async function returnStock({sourceOrganizationId, destinationOrganizationId, stocks}) {
    return request(`${API}/operation-change`, {
        method: 'post',
        body: JSON.stringify({
            sourceType: 3,
            sourceOrganizationId,
            destinationOrganizationId,
            partnerInventoryOperationItemReceivers: stocks
        })
    });
}
