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

// 会务管理
export function getById(pkgId) {
  return request({
    url: '/pkg/' + pkgId + '/score',
    method: 'get'
  })
}

// 结果查询
export function getDetailById(id) {
  return request({
    url: '/pkg/detail/' + id,
    method: 'get'
  })
}

export function getPkgExpertScoreDetail(pkgId, expertId) {
  return request({
    url: '/pkg/' + pkgId + '/expert/' + expertId + '/score',
    method: 'get'
  })
}

export function getPkgsByCfrsId(cfrsId) {
  return request({
    url: '/pkg/priceWithScore?cfrsId=' + cfrsId,
    method: 'get'
  })
}

export function setPkgPrices(pkgId, prices) {
  return request({
    url: '/pkg/' + pkgId + '/price/score',
    method: 'post',
    data: prices
  })
}
