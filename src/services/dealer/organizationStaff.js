import request from '../../utils/request';

const API = '/api/staff';

export async function getTelConfig() {
    return request('/api/configuration');
}

export async function create(staff) {
    return request(`${API}`, {
        method: 'post',
        body: JSON.stringify(staff)
    });
}

export async function modify(staff) {
    return request(`${API}`, {
        method: 'put',
        body: JSON.stringify(staff)
    });
}

export async function getStaffByOrganizationId({organizationId}) {
    return request(`${API}?organizationId=${organizationId}`);
}
