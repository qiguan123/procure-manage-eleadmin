import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    'name|1': 'abcccccc',
    'orgnization': 'BAT'
  }]
})

export default [
  {
    url: '/expert',
    type: 'get',
    response: config => {
      const items = data.items
      return items
    }
  },
  {
    url: '/expert',
    type: 'post',
    response: config => {
      return {}
    }
  }
]
