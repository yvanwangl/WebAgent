/**
 * Created by wyf on 2017/4/11.
 */
import request from '../utils/request';

export async function exportData({url, queryParams}) {
    return request(url, {
        method: 'post',
        body: JSON.stringify(queryParams)
    })
}