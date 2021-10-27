const Mock = require('mockjs')


require('./modules/user')
require('./modules/project')
require('./modules/overview')



Mock.setup({
  timeout: 800 // setter delay time
})