import User from '@modals/common/User'

const users = [
  ['noise'],
  {
    type: 'noise'
  },
  {
    type: 'user',
    name: 'u1',
    connections: [
      {
        type: 'user',
        name: 'u1-1'
      },
      {
        type: 'user',
        name: 'u1-2',
        connections: [{
          type: 'user',
          name: 'u1-2-1'
        }]
      },
      {
        type: 'user',
        name: 'u1-3'
      }
    ]
  },
  {
    type: 'user',
    name: 'u2',
    connections: [{
      type: 'user',
      name: 'u1-2-2'
    }]
  },
  {
    type: 'user',
    name: 'u3'
  }
]

function * iterateUsers (coll: [any], selectorFunction: (user: User) => boolean) {
  for (const ele in coll) {
    if (typeof ele === 'object' && (ele as any).type === 'user') {
      const iUser = { name: (ele as any).name }
      yield iUser
      // if (ele.connections) {

      // }
    } else {
      console.log('noise -> ', ele)
    }
  }
}

export default iterateUsers
