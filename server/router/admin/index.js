module.exports = app => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const express = require('express')
  const User = require('../../models/User')
  const auth = require('../../middleware/auth')
  const modelMiddleware = require('../../middleware/modelMiddleware')
  const router = express.Router({
    mergeParams: true
  })

  /**
   * 分类接口
   */
  // 添加分类接口
  router.post('/', auth(), async (req, res) => {
    console.log(req.body)
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 查询分类列表
  router.get('/', auth(), async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Categery') {
      queryOptions.populate = 'parent'
    }
    // res.send(modelName)
    const model = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(model)
  })
  // 根据id查找
  router.get('/:id', auth(), async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 更新
  router.put('/:id', auth(), async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除分类
  router.delete('/:id', auth(), async (req, res) => {

    const model = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })


  app.use('/admin/api/rest/:resource', auth(), modelMiddleware(), router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({
      name: username
    }).select('+password')
    assert(user, 422, '用户不存在')

    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误或权限不够！')

    const token = jwt.sign(user.id, app.get('secret'))
    res.send({
      token,
      username: user.name
    })
  })

  // 错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 400).send({
      msg: err.message
    })
  })
}