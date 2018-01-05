import DefineMap from 'can-define/map/'
import route from 'can-route'
import 'can-route-pushstate'

const AppViewModel = DefineMap.extend({
  page: 'string',
  message: {
    value: 'Hello!',
    serialize: false
  },
  title: {
    value: 'avx-token-app',
    serialize: false
  }
})

route('{page}', { page: 'home' })

export default AppViewModel
