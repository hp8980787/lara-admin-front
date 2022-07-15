import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/orders',
    method: 'get',
    params
  })
}
export function update(params, id) {
  return request({
    url: `/orders/${id}`,
    method: 'put',
    params
  })
}

export function link(params) {
  return request({
    url: "/orders/link_products",
    method: 'post',
    params
  })
}