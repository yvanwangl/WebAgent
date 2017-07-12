import request from '../../utils/request';

const API = '/api/inventory';

/*查询全部组织的仓库汇总信息*/
export async function getTotalStockList(){
    return request(`${API}/all-count`);
}
/*根据组织id查询组织仓库信息*/
export async function getStockListByOrganizationId({organizationId}) {
    return request(`${API}/organization/${organizationId}`);
}
/*查询组织树*/
export async function getOrganizationTree() {
    return request('/api/organization');
}
/*修改组织仓库*/
export async function modifyStock({organizationId, stocks}) {
    return request(`${API}/operation-change`, {
        method: 'post',
        body: JSON.stringify({
            sourceType: 0,
            destinationOrganizationId: organizationId,
            partnerInventoryOperationItemReceivers: stocks
        })
    });
}
/*组织仓库调拨*/
export async function transferStock({sourceOrganizationId, destinationOrganizationId, stocks}) {
    return request(`${API}/operation-change`, {
        method: 'post',
        body: JSON.stringify({
            sourceType: 1,
            sourceOrganizationId,
            destinationOrganizationId,
            partnerInventoryOperationItemReceivers: stocks
        })
    });
}


