import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: 'abcccccc',
    code: 'KY2019001',
    cfrsId: 1
  }]
})

export default [
  {
    url: '/project',
    type: 'get',
    response: config => {
      const items = data.items
      return items
    }
  },
  {
    url: '/cfrs',
    type: 'post',
    response: config => {
      return {}
    }
  }
]
