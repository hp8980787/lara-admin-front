import request from "@/utils/request"
export function create(params) {
    return request({
        url: "/purchases",
        method: "post",
        params
    })
}