import request from "@/utils/request"

export function index(params) {
    return request({
        url: '/bill/columns',
        method: 'get'
    })
}

export function store(params) {
    return request({
        url: '/bill/columns',
        method: 'post',
        params
    })
}