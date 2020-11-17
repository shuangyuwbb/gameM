/**
   * 用户接口
   */
  //用户注册
  module.exports = app =>{


  const User = require('../../models/User')

  router.post('/register', async (req, res) => {
    console.log(req.body)
    const model = await User.create(req.body)
    res.send(model)
  })
  app.use('/web/api',router)
}