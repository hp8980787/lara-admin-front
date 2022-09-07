import request from "@/utils/request"
export function index(params) {
    return request({
        url: '/workflow/categories',
        method: 'get',
        params
    })
}
export function store(params) {
    return request({
        url: '/workflow/categories',
        method: 'post',
        params
    })
}
export function update(params,id) {
    return request({
        url: `/workflow/categories/${id}`,
        method: 'put',
        params
    })
}
export function destroy(params,id) {
    return request({
        url: `/workflow/categories/${id}`,
        method: 'delete',
        params
    })
}