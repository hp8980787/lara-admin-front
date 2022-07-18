import request from "@/utils/request"
export function getList(params) {
    return request({
        url: '/supplier',
        method: 'get',
        params
    })
}