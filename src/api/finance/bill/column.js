import request from "@/utils/request"

export function index(params) {
    return request({
        url: '/bill/columns',
        method: 'get',
        params
    })
}

export function store(params) {
    return request({
        url: '/bill/columns',
        method: 'post',
        params
    })
}