import request from "@/utils/request"
export function getList(params) {
    return request({
        url: '/departments',
        method: 'get',
        params
    })
}
export function create(params) {
    return request({
        url: '/departments',
        method: 'post',
        params
    })
}

export function update(params,id) {
    return request({
        url: `/departments/${id}`,
        method: 'put',
        params
    })
}
/**
 * 
 * 获取规定格式分类
 * 
 * 
 * */
export function list(params) {
    return request({
        url: '/departments/list',
        method: 'get',
        params
    })
}

export function destroy(id){
    return request({
        url:`/departments/${id}`,
        method:'delete'
    })
}