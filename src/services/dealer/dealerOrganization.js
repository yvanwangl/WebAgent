import request from '../../utils/request';

const API = '/api/organization';
export async function getOrganizationTreeNodes() {
    return request(`${API}`);
}

export async function getOrganizationById({id}) {
    return request(`${API}/${id}`);
}

export async function create(organization) {
    return request(`${API}`, {
        method: 'post',
        body: JSON.stringify(organization)
    });
}

export async function modify(organization) {
    return request(`${API}`, {
        method: 'put',
        body: JSON.stringify(organization)
    });
}
