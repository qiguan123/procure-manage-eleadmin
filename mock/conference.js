import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    'name|1': 'abcccccc',
    'state|0-2': 1,
    startTime: '@datetime'
  }]
})

export default [
  {
    url: '/cfrsq',
    type: 'get',
    response: config => {
      const items = data.items
      return { 'data': items, 'total': 40}
    }
  },
  {
    url: '/cfrsq',
    type: 'post',
    response: config => {
      return {}
    }
  }
]
