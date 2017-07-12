import request from '../utils/request';

const API = '/api/password';

export async function modifyPass(values) {
    let url = values.type=='loginPass'?'/reset-user-password':'/reset-pin-password';
    return request(`${API}${url}`, {
        method: 'post',
        body: JSON.stringify({
            oldPassword: values.oldPass,
            newPassword: values.newPass
        })
    });
}
