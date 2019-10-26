import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    'name|1': 'abcccccc'
  }]
})

export default [
  {
    url: '/bidder',
    type: 'get',
    response: config => {
      const items = data.items
      return items
    }
  },
  {
    url: '/bidder',
    type: 'post',
    response: config => {
      return {}
    }
  }
]
