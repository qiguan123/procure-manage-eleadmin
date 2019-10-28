import request from '@/utils/request'

export function getList(listQuery) {
  const nameQuery = listQuery.name ? '&name=' + listQuery.name : ''
  return request({
    url: '/project?page=' + listQuery.page + '&limit=' + listQuery.limit + nameQuery,
    method: 'get'
  })
}

export function addProject(project) {
  return request({
    url: '/project',
    method: 'post',
    data: project
  })
}

export function getUnstartedProjects() {
  return request({
    url: '/project/unstarted',
    method: 'get'
  })
}