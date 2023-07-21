import { request } from '../utils/request';
const API_url = import.meta.env.API_URL;

// API 声明
const Api = {
    addcontact:     API_url+ '/contact/add',
    updatecontact:  API_url+ '/contact/update',
    listcontact:    API_url+ '/contact/list',
    deletecontact:  API_url+ '/contact/delete',
    Listbytoken:    API_url+ '/contact/listbytoken',
};

// API 服务

export function addcontact(data) {
    return request.post({
        url: Api.addcontact,
        data,
    });
}

export function updatecontact(data) {
    return request.put({
        url: Api.updatecontact,
        data,
    });
}

export function listcontact(data) {
    return request.post({
        url: Api.listcontact,
        data,
    });
}

export function listbytoken(data) {
    return request.post({
        url: Api.Listbytoken,
        data,
    });
}

export function deletecontact(data) {
    return request.delete({
        url: Api.deletecontact,
        data,
    });
}
