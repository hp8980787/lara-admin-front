import request from "@/utils/request"

export function getList(params) {
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