import request from "@/utils/request"
export function store(params) {
    return request({
        url: '/bill',
        method: 'post',
        params
    })
}

export function index(params){
    return request({
        url:'/bill',
        method:'get',
        params
    })
}