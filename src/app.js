import DefineMap from 'can-define/map/'
import route from 'can-route'
import 'can-route-pushstate'

const AppViewModel = DefineMap.extend({seal: false}, {
  message: {
    value: 'Hello World!',
    serialize: false
  },
  title: {
    value: 'avx-token-app',
    serialize: false
  }
})

route('{page}', { page: 'home' })

export default AppViewModel
