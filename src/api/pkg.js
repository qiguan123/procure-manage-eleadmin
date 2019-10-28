import request from '@/utils/request'

export function getList(listQuery) {
  const nameQuery = listQuery.name ? '&name=' + listQuery.name : ''
  return request({
    url: '/pkg?page=' + listQuery.page + '&limit=' + listQuery.limit + nameQuery,
    method: 'get'
  })
}

export function addPkg(formData) {
  return request({
    url: '/pkg',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function getById(id) {
  return request({
    url: '/pkg/' + id,
    method: 'get'
  })
}
