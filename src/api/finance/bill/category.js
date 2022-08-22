import request from "@/utils/request"

export function index(params) {
    return request({
        url: '/bill/category',
        method: 'get',
        params
    })
}
export function store(params) {
    return request({
        url: '/bill/category',
        method: 'post',
        params
    })
}

export function update(params, id) {
    return request({
        url: `/bill/category/${id}`,
        method: 'put',
        params
    })
}

export function destroy(id) {
    return request({
        url: `/bill/category/${id}`,
        method: 'delete',
    })
}

export function assign(params) {
    return request({
        url: '/bill/category/assign',
        method: 'post',
        params
    })
}

export function list(params) {
    return request({
        url: '/bill/category/list',
        method: 'get',
        params
    })
}