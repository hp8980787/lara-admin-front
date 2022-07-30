import request from "@/utils/request"

export function getList(params) {
    return request({
        url: "/warehouses/record",
        method: 'get',
        params
    })
}