import request from "@/utils/request"
export function list(params) {
    return request({
        url: '/roles',
        method: 'get',
        params
    })
}