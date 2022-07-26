import request from "@/utils/request"
export function create(params) {
    return request({
        url: "/purchases",
        method: "post",
        params
    })
}

export function getList(params) {
    return request({
        url: "/purchases",
        method: 'get',
        params
    })
}
export function update(params, id) {
    return request({
        url: `/purchases/${id}`,
        method: 'put',
        params
    })
}

export function approve(params,id){
    return request({
        url:`/purchases/${id}/approve`,
        method:'put',
        params
    })
}