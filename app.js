const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000
const users = require('./users.json')

// require packages used in the project
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定 body-parser
app.use(express.urlencoded({ extended: true }))

//首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

//對照帳號密碼皆相同 則導歡迎頁 否則顯示錯誤提示文字
app.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const validUser = users.users.find(user => user.email === email && user.password === password)

  console.log(email, password)
  console.log(validUser)

  //比照帳密合格
  if (validUser) {
    res.render('welcome', { user: validUser })

  } else {
    //帳密錯誤
    const invalidAlert = true
    res.render('index', { invalidAlert })
  }

})

app.listen(port, () => {
  console.log('http://localhost:3000/ connected')
})