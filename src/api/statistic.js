import request from '@/utils/request'

export function getStatistc() {
  return request({
    url: '/statistic',
    method: 'get'
  })
}
