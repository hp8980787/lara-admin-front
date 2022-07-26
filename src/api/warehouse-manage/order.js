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
/*
 *订单发货 
 * 
 */
export function orderShip(params) {
  return request({
    url: '/orders/ship',
    method: 'post',
    params
  })
}

/*
* 查询可发货的仓库，订单下所有产品必须是同一仓库发货
*
*/
export function warehouse(params) {
  return request({
    url: '/orders/warehouse',
    method: 'post',
    params
  })
}