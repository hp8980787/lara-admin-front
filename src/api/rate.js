import request from "@/utils/request"

export function rate(params) {
    return request({
        url: "/rate",
        method: "get",
        params
    })
}