import request from '@/utils/request'

export function getList(listQuery) {
  const nameQuery = listQuery.name ? '&name=' + listQuery.name : ''
  return request({
    url: '/expert?page=' + listQuery.page + '&limit=' + listQuery.limit + nameQuery,
    method: 'get'
  })
}

export function addExpert(e) {
  return request({
    url: '/expert',
    method: 'post',
    data: e
  })
}
