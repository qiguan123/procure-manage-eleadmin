import request from '@/utils/request'

export function getList(listQuery) {
  const nameQuery = listQuery.name ? '&name=' + listQuery.name : ''
  return request({
    url: '/bidder?page=' + listQuery.page + '&limit=' + listQuery.limit + nameQuery,
    method: 'get'
  })
}

export function addBidder(b) {
  return request({
    url: '/bidder',
    method: 'post',
    data: b
  })
}

export function getAllBidders() {
  return request({
    url: '/bidder/simple',
    method: 'get'
  })
}
