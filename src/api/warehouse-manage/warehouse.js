import request from "@/utils/request"
export function getList(params) {
    return request({
        url: '/warehouses',
        method: 'get',
        params
    })
}

export function create(params) {
    return request({
        url: "/warehouses",
        method: "post",
        params
    })
}
export function update(params,id){
    return request({
        url:`/warehouses/${id}`,
        method:'put',
        params
    })
}

export function destroy(id){
    return request({
        url :`/warehouses/${id}`,
        method:'delete'
    })
}
export function getListAll(params) {
    return request({
        url: '/warehouses/list',
        method: 'get',
        params
    })
}