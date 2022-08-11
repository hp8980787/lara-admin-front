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