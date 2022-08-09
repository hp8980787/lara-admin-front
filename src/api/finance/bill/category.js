import request from "@/utils/request"

export function store(params) {
    return request({
        url: '/bill/category',
        method: 'post',
        params
    })
}