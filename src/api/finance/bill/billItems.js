import request from "@/utils/request"
export function store(params) {
    return request({
        url: '/bill/items',
        method: 'post',
        params
    })
}

export function index(params) {
    return request({
        url: '/bill/items',
        method: 'get',
        params
    })
}