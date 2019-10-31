import request from '@/utils/request'

export function getList(listQuery) {
  const nameQuery = listQuery.name ? '&name=' + listQuery.name : ''
  return request({
    url: '/cfrs?page=' + listQuery.page + '&limit=' + listQuery.limit + nameQuery,
    method: 'get'
  })
}

export function addCfrs(cfrs) {
  return request({
    url: '/cfrs',
    method: 'post',
    data: cfrs
  })
}

export function startCfrs(cfrsId) {
  return request({
    url: '/cfrs/' + cfrsId + '/start',
    method: 'post'
  })
}

export function closeCfrs(cfrsId) {
  return request({
    url: '/cfrs/' + cfrsId + '/close',
    method: 'post'
  })
}

export function getPreparedCfrsList() {
  return request({
    url: '/cfrs/prepared',
    method: 'get'
  })
}

export function getClosedCfrsList() {
  return request({
    url: '/cfrs/closed',
    method: 'get'
  })
}
