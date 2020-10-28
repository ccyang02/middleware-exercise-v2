const express = require('express')
const app = express()
const port = 3000

require('console-stamp')(console, {
  format: ':date(yyyy-mm-dd HH:MM:ss.l).yellow :label'
});

function timeLogger(req, res) {
  console.log(`${req.method} from ${req.originalUrl} | total time: ${res.locals.endTime - res.locals.startTime}ms`)
}

app.use(function (req, res, next) {
  // 會在一連串 middleware 執行的開始和結束執行各一次
  res.locals.startTime = Date.now()
  next()
})

app.get('/', (req, res, next) => {
  console.log('Do something...')
  next()
}, (req, res, next) => {
  console.log('Do something again...')
  next()
}, (req, res, next) => {
  res.locals.endTime = Date.now()
  res.send('列出全部 Todo')
  next()
}, timeLogger)

app.get('/new', (req, res, next) => {
  res.locals.endTime = Date.now()
  res.send('新增 Todo 頁面')
  next()
}, timeLogger)

app.get('/:id', (req, res, next) => {
  res.locals.endTime = Date.now()
  res.send('顯示一筆 Todo')
  next()
}, timeLogger)

app.post('/', (req, res, next) => {
  res.locals.endTime = Date.now()
  res.send('新增一筆  Todo')
  next()
}, timeLogger)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})